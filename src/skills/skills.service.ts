import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';
import { 
  SkillNotFoundException, 
  SkillAlreadyExistsException, 
  InvalidSkillDataException 
} from './exceptions/skill.exceptions';
import { SkillDto } from './dto/skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { FindSkillsDto } from './dto/find-skills.dto';

/**
 * Interface pour les données brutes d'une compétence en base de données
 */
interface SkillEntity {
  id: string;
  order: number;
  name: string;
  image_url: string | null;
  created_at: string;
}

/**
 * Interface pour les résultats paginés
 */
interface PaginatedResult<T> {
  data: T[];
  total: number;
}

/**
 * Service gérant les opérations CRUD sur les compétences
 */
@Injectable()
export class SkillsService {
  /**
   * @param databaseService Service d'accès à la base de données
   */
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Récupère une liste paginée de compétences avec options de filtrage
   * @param query Paramètres de recherche et pagination
   * @returns Liste paginée de compétences
   */
  async findAll(query: FindSkillsDto): Promise<PaginatedResult<SkillDto>> {
    const db = this.databaseService.getDatabase();
    const { search, limit = 10, page = 1 } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (search) {
      whereClause += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    const countQuery = db.prepare(`
      SELECT COUNT(*) as total
      FROM skills
      WHERE ${whereClause}
    `);

    const result = countQuery.get(...params) as { total: number };
    const total = result.total;

    const selectQuery = db.prepare(`
      SELECT id, "order", name, image_url, created_at
      FROM skills
      WHERE ${whereClause}
      ORDER BY "order" ASC
      LIMIT ? OFFSET ?
    `);

    const skills = selectQuery.all(...params, limit, offset) as SkillEntity[];

    return {
      data: skills.map(skill => this.mapEntityToDto(skill)),
      total
    };
  }

  /**
   * Récupère une compétence par son identifiant
   * @param id Identifiant de la compétence
   * @returns Compétence trouvée
   * @throws SkillNotFoundException si la compétence n'existe pas
   */
  async findOne(id: string): Promise<SkillDto> {
    const db = this.databaseService.getDatabase();
    const skill = db.prepare('SELECT id, "order", name, image_url FROM skills WHERE id = ?').get(id) as SkillEntity | undefined;
    
    if (!skill) {
      throw new NotFoundException(`La compétence avec l'ID ${id} n'existe pas`);
    }
    
    return this.mapEntityToDto(skill);
  }

  /**
   * Crée une nouvelle compétence
   * @param createSkillDto Données de la compétence à créer
   * @returns Compétence créée
   * @throws SkillAlreadyExistsException si une compétence avec le même nom existe déjà
   */
  async create(createSkillDto: CreateSkillDto): Promise<SkillDto> {
    const db = this.databaseService.getDatabase();
    
    const existingSkill = db.prepare('SELECT id FROM skills WHERE name = ?').get(createSkillDto.name);
    
    if (existingSkill) {
      throw new ConflictException(`Une compétence avec le nom "${createSkillDto.name}" existe déjà`);
    }
    
    // Trouver la valeur maximale d'order
    const maxOrder = db.prepare('SELECT MAX("order") as maxOrder FROM skills').get() as { maxOrder: number | null };
    const newOrder = (maxOrder.maxOrder || 0) + 1;
    
    const skillData: Omit<SkillEntity, 'created_at'> = {
      id: crypto.randomUUID(),
      order: newOrder,
      name: createSkillDto.name,
      image_url: createSkillDto.image_url || null
    };
    
    try {
      const insert = db.prepare(`
        INSERT INTO skills (id, "order", name, image_url, created_at)
        VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
      `);
      
      insert.run(
        skillData.id,
        skillData.order,
        skillData.name,
        skillData.image_url
      );
      
      return this.findOne(skillData.id);
    } catch (error) {
      throw new InvalidSkillDataException(error.message);
    }
  }

  /**
   * Met à jour une compétence existante
   * @param id Identifiant de la compétence à mettre à jour
   * @param updateSkillDto Données à mettre à jour
   * @returns Compétence mise à jour
   * @throws SkillNotFoundException si la compétence n'existe pas
   * @throws SkillAlreadyExistsException si une autre compétence utilise déjà le nom fourni
   */
  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<SkillDto> {
    const db = this.databaseService.getDatabase();
    
    const existingSkill = db.prepare('SELECT id, "order", name, image_url FROM skills WHERE id = ?').get(id) as SkillEntity | undefined;
    
    if (!existingSkill) {
      throw new NotFoundException(`La compétence avec l'ID ${id} n'existe pas`);
    }
    
    if (updateSkillDto.name && updateSkillDto.name !== existingSkill.name) {
      const nameExists = db.prepare('SELECT id FROM skills WHERE name = ? AND id != ?').get(updateSkillDto.name, id);
      
      if (nameExists) {
        throw new ConflictException(`Une compétence avec le nom "${updateSkillDto.name}" existe déjà`);
      }
    }
    
    const updatedSkillData: SkillEntity = {
      id,
      order: existingSkill.order,
      name: updateSkillDto.name || existingSkill.name,
      image_url: updateSkillDto.image_url || existingSkill.image_url,
      created_at: existingSkill.created_at
    };
    
    const update = db.prepare(`
      UPDATE skills
      SET "order" = ?, name = ?, image_url = ?
      WHERE id = ?
    `);
    
    update.run(
      updatedSkillData.order,
      updatedSkillData.name,
      updatedSkillData.image_url,
      updatedSkillData.id
    );
    
    return this.findOne(updatedSkillData.id);
  }

  private mapEntityToDto(entity: SkillEntity): SkillDto {
    return {
      id: entity.id,
      order: entity.order,
      name: entity.name,
      image_url: entity.image_url,
      created_at: entity.created_at
    };
  }

  /**
   * Supprime une compétence
   * @param id Identifiant de la compétence à supprimer
   * @throws SkillNotFoundException si la compétence n'existe pas
   */
  async remove(id: string): Promise<void> {
    const db = this.databaseService.getDatabase();
    const skill = await this.findOne(id);
    
    // Supprimer la compétence
    db.prepare('DELETE FROM skills WHERE id = ?').run(id);
    
    // Réorganiser les ordres des compétences restantes
    db.prepare('UPDATE skills SET "order" = "order" - 1 WHERE "order" > ?').run(skill.order);
  }
}