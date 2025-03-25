import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';
import { 
  HeroBannerNotFoundException, 
  HeroBannerAlreadyExistsException, 
  InvalidHeroBannerDataException 
} from './exceptions/herobanner.exceptions';
import { HeroBannerTextDto } from './dto/hero-banner-text.dto';
import { CreateHeroBannerTextDto } from './dto/create-hero-banner-text.dto';
import { UpdateHeroBannerTextDto } from './dto/update-hero-banner-text.dto';
import { FindHeroBannerDto } from './dto/find-hero-banner-text.dto';

/**
 * Interface pour les données brutes d'un texte de Hero Banner en base de données
 */
interface HeroBannerEntity {
  id: string;
  order: number;
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
  async findAll(query: FindHeroBannerDto): Promise<PaginatedResult<HeroBannerTextDto>> {
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
    const limit = query.limit || 100;
    const page = query.page || 10;
    const offset = (page - 1) * limit;

    // Comptage du nombre total d'éléments
    const countStmt = db.prepare(
      sqlQuery.replace('SELECT *', 'SELECT COUNT(*) as count')
    );
    const totalCount = countStmt.get(...params) as { count: number };

    // Ajout de la pagination à la requête
    sqlQuery += ' ORDER BY "order" ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Exécution de la requête paginée
    const stmt = db.prepare(sqlQuery);
    const rows = stmt.all(...params) as HeroBannerEntity[];

    // Transformation des entités en DTOs
    return {
      data: rows.map(row => this.mapEntityToDtoText(row)),
      total: totalCount.count
    };
  }

  /**
   * Récupère un texte de Hero Banner par son ID
   * @param id ID du texte à récupérer
   * @returns Le texte de Hero Banner trouvé
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   */
  async findOne(id: string): Promise<HeroBannerTextDto> {
    const db = this.databaseService.getDatabase();
    const stmt = db.prepare('SELECT * FROM hero_banner_texts WHERE id = ?');
    const result = stmt.get(id) as HeroBannerEntity | undefined;

    if (!result) {
      throw new HeroBannerNotFoundException(id);
    }

    return this.mapEntityToDtoText(result);
  }

  /**
   * Crée un nouveau texte de Hero Banner
   * @param createHeroBannerTextDto Données du texte à créer
   * @returns Le texte de Hero Banner créé
   * @throws HeroBannerAlreadyExistsException si un texte avec le même contenu existe déjà
   */
  async create(createHeroBannerTextDto: CreateHeroBannerTextDto): Promise<HeroBannerTextDto> {
    const db = this.databaseService.getDatabase();

    // Vérification si un texte similaire existe déjà
    const existingStmt = db.prepare('SELECT * FROM hero_banner_texts WHERE text = ?');
    const existing = existingStmt.get(createHeroBannerTextDto.text);

    if (existing) {
      throw new HeroBannerAlreadyExistsException(createHeroBannerTextDto.text);
    }

    // Trouver la valeur maximale d'order
    const maxOrder = db.prepare('SELECT MAX("order") as maxOrder FROM hero_banner_texts').get() as { maxOrder: number | null };
    const newOrder = (maxOrder.maxOrder || 0) + 1;  

    const newText: Omit<HeroBannerEntity, 'created_at'> = {
      id: crypto.randomUUID(),
      order: newOrder,
      text: createHeroBannerTextDto.text,
      is_active: createHeroBannerTextDto.is_active ? 1 : 0
    };

    const insertStmt = db.prepare(`
      INSERT INTO hero_banner_texts (id, "order", text, is_active, created_at)
      VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
    `);

    try {
      insertStmt.run(newText.id, newText.order, newText.text, newText.is_active);
      return this.findOne(newText.id);
    } catch (error) {
      throw new InvalidHeroBannerDataException(`Erreur lors de la création du texte: ${error.message}`);
    }
  }

  /**
   * Met à jour un texte de Hero Banner existant
   * @param id ID du texte à mettre à jour
   * @param updateHeroBannerTextDto Données de mise à jour
   * @returns Le texte de Hero Banner mis à jour
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   * @throws HeroBannerAlreadyExistsException si le nouveau texte est déjà utilisé par un autre élément
   */
  async update(id: string, updateHeroBannerTextDto: UpdateHeroBannerTextDto): Promise<HeroBannerTextDto> {
    const db = this.databaseService.getDatabase();
    const existingText = await this.findOne(id);

    if (updateHeroBannerTextDto.order !== undefined) {
      const currentOrder = existingText.order;
      const newOrder = updateHeroBannerTextDto.order;

      if (newOrder !== currentOrder) {
        if (newOrder > currentOrder) {
          // Déplace les textes vers le bas
          db.prepare('UPDATE hero_banner_texts SET "order" = "order" - 1 WHERE "order" > ? AND "order" <= ?')
            .run(currentOrder, newOrder);
        } else {
          // Déplace les textes vers le haut
          db.prepare('UPDATE hero_banner_texts SET "order" = "order" + 1 WHERE "order" >= ? AND "order" < ?')
            .run(newOrder, currentOrder);
        }
      }
    }

    // Vérification si le nouveau texte est déjà utilisé par un autre élément
    if (updateHeroBannerTextDto.text) {
      const textCheckStmt = db.prepare('SELECT * FROM hero_banner_texts WHERE text = ? AND id != ?');
      const textExists = textCheckStmt.get(updateHeroBannerTextDto.text, id);

      if (textExists) {
        throw new HeroBannerAlreadyExistsException(updateHeroBannerTextDto.text);
      }
    }

    const updateQuery = db.prepare(`
      UPDATE hero_banner_texts
      SET
        "order" = COALESCE(?, "order"),
        text = COALESCE(?, text),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `);

    updateQuery.run(
      updateHeroBannerTextDto.order ?? existingText.order,
      updateHeroBannerTextDto.text ?? existingText.text,
      updateHeroBannerTextDto.is_active === undefined ? existingText.is_active : updateHeroBannerTextDto.is_active ? 1 : 0,
      id
    );

    return this.findOne(id);
  }

  /**
   * Supprime un texte de Hero Banner
   * @param id ID du texte à supprimer
   * @returns Le texte de Hero Banner supprimé
   * @throws HeroBannerNotFoundException si le texte n'est pas trouvé
   */
  async remove(id: string): Promise<void> {
    const db = this.databaseService.getDatabase();
    const text = await this.findOne(id);

    // Supprime le texte
    const result = db.prepare('DELETE FROM hero_banner_texts WHERE id = ?').run(id);

    if (result.changes === 0) {
      throw new HeroBannerNotFoundException(id);
    }

    // Réorganise les ordres des textes restants
    db.prepare('UPDATE hero_banner_texts SET "order" = "order" - 1 WHERE "order" > ?').run(text.order);
  }

  /**
   * Convertit une entité en DTO avec l'ordre
   */
  private mapEntityToDtoText(entity: HeroBannerEntity): HeroBannerTextDto {
    return {
      id: entity.id,
      order: entity.order,
      text: entity.text,
      is_active: entity.is_active === 1,
      created_at: entity.created_at
    };
  }
} 