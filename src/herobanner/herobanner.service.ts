import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';
import { 
  HeroBannerNotFoundException, 
  HeroBannerAlreadyExistsException, 
  InvalidHeroBannerDataException 
} from './exceptions/herobanner.exceptions';
import { HeroBannerDto } from './dto/herobanner.dto';
import { CreateHeroBannerDto } from './dto/create-herobanner.dto';
import { UpdateHeroBannerDto } from './dto/update-herobanner.dto';
import { FindHeroBannerDto } from './dto/find-herobanner.dto';

/**
 * Interface pour les données brutes d'un texte de Hero Banner en base de données
 */
interface HeroBannerEntity {
  id: string;
  text: string;
  is_active: number; // 1 = true, 0 = false en SQLite
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
 * Service pour la gestion des textes de la Hero Banner
 */
@Injectable()
export class HeroBannerService {
  /**
   * @param databaseService Service d'accès à la base de données
   */
  constructor(private databaseService: DatabaseService) {}

  /**
   * Récupère la liste paginée des textes de Hero Banner avec filtrage
   * @param query Paramètres de filtrage et pagination
   * @returns Liste paginée des textes de Hero Banner
   */
  async findAll(query: FindHeroBannerDto): Promise<PaginatedResult<HeroBannerDto>> {
    const db = this.databaseService.getDatabase();
    
    // Construction de la requête SQL dynamique
    let sqlQuery = 'SELECT * FROM hero_banner_texts WHERE 1=1';
    const params: any[] = [];

    // Ajout du filtre sur le texte si présent
    if (query.search) {
      sqlQuery += ' AND text LIKE ?';
      params.push(`%${query.search}%`);
    }

    // Ajout du filtre sur l'état actif si présent
    if (query.isActive !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(query.isActive ? 1 : 0);
    }

    // Calcul de la pagination
    const limit = query.limit || 10;
    const page = query.page || 1;
    const offset = (page - 1) * limit;

    // Comptage du nombre total d'éléments
    const countStmt = db.prepare(
      sqlQuery.replace('SELECT *', 'SELECT COUNT(*) as count')
    );
    const totalCount = countStmt.get(...params) as { count: number };

    // Ajout de la pagination à la requête
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Exécution de la requête paginée
    const stmt = db.prepare(sqlQuery);
    const rows = stmt.all(...params) as HeroBannerEntity[];

    // Transformation des entités en DTOs
    return {
      data: rows.map(row => this.mapEntityToDto(row)),
      total: totalCount.count
    };
  }

  /**
   * Récupère un texte de Hero Banner par son ID
   * @param id ID du texte à récupérer
   * @returns Le texte de Hero Banner trouvé
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   */
  async findOne(id: string): Promise<HeroBannerDto> {
    const db = this.databaseService.getDatabase();
    const stmt = db.prepare('SELECT * FROM hero_banner_texts WHERE id = ?');
    const result = stmt.get(id) as HeroBannerEntity | undefined;

    if (!result) {
      throw new HeroBannerNotFoundException(id);
    }

    return this.mapEntityToDto(result);
  }

  /**
   * Crée un nouveau texte de Hero Banner
   * @param createHeroBannerDto Données du texte à créer
   * @returns Le texte de Hero Banner créé
   * @throws HeroBannerAlreadyExistsException si un texte avec le même contenu existe déjà
   */
  async create(createHeroBannerDto: CreateHeroBannerDto): Promise<HeroBannerDto> {
    const db = this.databaseService.getDatabase();

    // Vérification si un texte similaire existe déjà
    const existingStmt = db.prepare('SELECT * FROM hero_banner_texts WHERE text = ?');
    const existing = existingStmt.get(createHeroBannerDto.text);

    if (existing) {
      throw new HeroBannerAlreadyExistsException(createHeroBannerDto.text);
    }

    const id = crypto.randomUUID();
    const isActive = createHeroBannerDto.isActive !== undefined ? createHeroBannerDto.isActive : true;
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO hero_banner_texts (id, text, is_active, created_at)
      VALUES (?, ?, ?, ?)
    `);

    try {
      insertStmt.run(id, createHeroBannerDto.text, isActive ? 1 : 0, now);
    } catch (error) {
      throw new InvalidHeroBannerDataException(`Erreur lors de la création du texte: ${error.message}`);
    }

    return {
      id,
      text: createHeroBannerDto.text,
      isActive,
      created_at: now
    };
  }

  /**
   * Met à jour un texte de Hero Banner existant
   * @param id ID du texte à mettre à jour
   * @param updateHeroBannerDto Données de mise à jour
   * @returns Le texte de Hero Banner mis à jour
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   * @throws HeroBannerAlreadyExistsException si le nouveau texte est déjà utilisé par un autre élément
   */
  async update(id: string, updateHeroBannerDto: UpdateHeroBannerDto): Promise<HeroBannerDto> {
    const db = this.databaseService.getDatabase();

    // Vérification de l'existence du texte
    const existingStmt = db.prepare('SELECT * FROM hero_banner_texts WHERE id = ?');
    const existing = existingStmt.get(id) as HeroBannerEntity | undefined;

    if (!existing) {
      throw new HeroBannerNotFoundException(id);
    }

    // Vérification si le nouveau texte est déjà utilisé par un autre élément
    if (updateHeroBannerDto.text) {
      const textCheckStmt = db.prepare('SELECT * FROM hero_banner_texts WHERE text = ? AND id != ?');
      const textExists = textCheckStmt.get(updateHeroBannerDto.text, id);

      if (textExists) {
        throw new HeroBannerAlreadyExistsException(updateHeroBannerDto.text);
      }
    }

    // Construction de la requête de mise à jour
    let updateQuery = 'UPDATE hero_banner_texts SET';
    const updateParams: any[] = [];
    let needsComma = false;

    if (updateHeroBannerDto.text !== undefined) {
      updateQuery += ' text = ?';
      updateParams.push(updateHeroBannerDto.text);
      needsComma = true;
    }

    if (updateHeroBannerDto.isActive !== undefined) {
      if (needsComma) updateQuery += ',';
      updateQuery += ' is_active = ?';
      updateParams.push(updateHeroBannerDto.isActive ? 1 : 0);
    }

    updateQuery += ' WHERE id = ?';
    updateParams.push(id);

    try {
      const updateStmt = db.prepare(updateQuery);
      updateStmt.run(...updateParams);
    } catch (error) {
      throw new InvalidHeroBannerDataException(`Erreur lors de la mise à jour du texte: ${error.message}`);
    }

    // Récupération du texte mis à jour
    return this.findOne(id);
  }

  /**
   * Supprime un texte de Hero Banner
   * @param id ID du texte à supprimer
   * @returns Le texte de Hero Banner supprimé
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   */
  async remove(id: string): Promise<HeroBannerDto> {
    const db = this.databaseService.getDatabase();
    
    // Récupération du texte avant suppression
    const heroBanner = await this.findOne(id);
    
    const deleteStmt = db.prepare('DELETE FROM hero_banner_texts WHERE id = ?');
    const result = deleteStmt.run(id);
    
    if (result.changes === 0) {
      throw new HeroBannerNotFoundException(id);
    }
    
    return heroBanner;
  }

  /**
   * Convertit une entité de base de données en DTO
   * @param entity Entité de base de données
   * @returns DTO formaté
   */
  private mapEntityToDto(entity: HeroBannerEntity): HeroBannerDto {
    return {
      id: entity.id,
      text: entity.text,
      isActive: entity.is_active === 1,
      created_at: entity.created_at
    };
  }
} 