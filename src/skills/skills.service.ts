import { Injectable } from '@nestjs/common';
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
  name: string;
  category: string | null;
  description: string | null;
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
  constructor(private databaseService: DatabaseService) {}

  /**
   * Récupère une liste paginée de compétences avec options de filtrage
   * @param query Paramètres de recherche et pagination
   * @returns Liste paginée de compétences
   */
  async findAll(query: FindSkillsDto): Promise<PaginatedResult<SkillDto>> {
    const db = this.databaseService.getDatabase();
    const { category, search, limit = 10, page = 1, sort = 'asc' } = query;
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const countQuery = db.prepare(`
      SELECT COUNT(*) as total
      FROM skills
      WHERE ${whereClause}
    `);

    const result = countQuery.get(...params) as { total: number };
    const total = result.total;

    const selectQuery = db.prepare(`
      SELECT *
      FROM skills
      WHERE ${whereClause}
      ORDER BY name ${sort === 'desc' ? 'DESC' : 'ASC'}
      LIMIT ? OFFSET ?
    `);

    const skills = selectQuery.all(...params, limit, offset) as SkillEntity[];

    return {
      data: skills.map(skill => this.mapToSkillDto(skill)),
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
    const skill = db.prepare('SELECT * FROM skills WHERE id = ?').get(id) as SkillEntity | undefined;
    
    if (!skill) {
      throw new SkillNotFoundException(id);
    }
    
    return this.mapToSkillDto(skill);
  }

  /**
   * Crée une nouvelle compétence
   * @param createSkillDto Données de la compétence à créer
   * @returns Compétence créée
   * @throws SkillAlreadyExistsException si une compétence avec le même nom existe déjà
   */
  async create(createSkillDto: CreateSkillDto): Promise<SkillDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si une compétence avec le même nom existe déjà
    const existingSkill = db.prepare('SELECT id FROM skills WHERE name = ?').get(createSkillDto.name);
    
    if (existingSkill) {
      throw new SkillAlreadyExistsException(createSkillDto.name);
    }
    
    // Préparer les données pour l'insertion
    const skillData = {
      id: crypto.randomUUID(),
      name: createSkillDto.name,
      category: createSkillDto.category || null,
      description: createSkillDto.description || null,
      image_url: createSkillDto.image_url || null,
      created_at: new Date().toISOString()
    };
    
    try {
      const insert = db.prepare(`
        INSERT INTO skills (id, name, category, description, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      insert.run(
        skillData.id,
        skillData.name,
        skillData.category,
        skillData.description,
        skillData.image_url,
        skillData.created_at
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
    
    // Vérifier si la compétence existe
    const existingSkill = db.prepare('SELECT * FROM skills WHERE id = ?').get(id) as SkillEntity | undefined;
    
    if (!existingSkill) {
      throw new SkillNotFoundException(id);
    }
    
    // Si le nom change, vérifier qu'il n'est pas déjà utilisé
    if (updateSkillDto.name && updateSkillDto.name !== existingSkill.name) {
      const nameExists = db.prepare('SELECT id FROM skills WHERE name = ? AND id != ?').get(updateSkillDto.name, id);
      
      if (nameExists) {
        throw new SkillAlreadyExistsException(updateSkillDto.name);
      }
    }
    
    // Construire la requête de mise à jour
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    for (const [key, value] of Object.entries(updateSkillDto)) {
      if (value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }
    
    if (updateFields.length === 0) {
      return this.findOne(id);
    }
    
    // Ajouter l'ID à la fin des valeurs pour la clause WHERE
    updateValues.push(id);
    
    try {
      const updateQuery = db.prepare(`
        UPDATE skills
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `);
      
      updateQuery.run(...updateValues);
      
      return this.findOne(id);
    } catch (error) {
      throw new InvalidSkillDataException(error.message);
    }
  }

  /**
   * Supprime une compétence
   * @param id Identifiant de la compétence à supprimer
   * @returns Compétence supprimée
   * @throws SkillNotFoundException si la compétence n'existe pas
   */
  async remove(id: string): Promise<SkillDto> {
    const db = this.databaseService.getDatabase();
    const skill = await this.findOne(id);
    
    db.prepare('DELETE FROM skills WHERE id = ?').run(id);
    
    return skill;
  }

  /**
   * Convertit les données brutes de la base de données en DTO
   * @param skill Données brutes de la compétence
   * @returns DTO de la compétence
   */
  private mapToSkillDto(skill: SkillEntity): SkillDto {
    return {
      ...skill,
      created_at: new Date(skill.created_at)
    };
  }
} 