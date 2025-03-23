/**
 * @fileoverview Service gérant les opérations sur les données "À propos de moi"
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AboutMeDto } from './dto/aboutme.dto';
import { UpdateAboutMeDto } from './dto/update-aboutme.dto';

/**
 * Interface représentant les données brutes de la base de données
 */
interface AboutMeEntity {
  id: string;
  text: string;
  updated_at: string; // Format ISO date string
}

/**
 * Service gérant les opérations sur les données "À propos de moi"
 */
@Injectable()
export class AboutMeService {
  /**
   * @param databaseService Service d'accès à la base de données
   */
  constructor(private databaseService: DatabaseService) {}

  /**
   * Récupère les données "À propos de moi"
   * @returns Les données "À propos de moi"
   * @throws {NotFoundException} Si aucune donnée n'est trouvée
   */
  async getAboutMe(): Promise<AboutMeDto> {
    const db = this.databaseService.getDatabase();
    
    // Récupérer le premier (et normalement unique) enregistrement
    const aboutMe = db.prepare('SELECT * FROM about_me LIMIT 1').get() as AboutMeEntity | undefined;
    
    if (!aboutMe) {
      throw new NotFoundException('Les données "À propos de moi" ne sont pas trouvées');
    }
    
    return this.mapToAboutMeDto(aboutMe);
  }

  /**
   * Met à jour les données "À propos de moi"
   * @param updateAboutMeDto Les nouvelles données
   * @returns Les données mises à jour
   */
  async updateAboutMe(updateAboutMeDto: UpdateAboutMeDto): Promise<AboutMeDto> {
    const db = this.databaseService.getDatabase();
    
    // Vérifier si un enregistrement existe déjà
    const existingRecord = db.prepare('SELECT id FROM about_me LIMIT 1').get() as {id: string} | undefined;
    
    if (existingRecord) {
      // Mettre à jour l'enregistrement existant
      db.prepare(`
        UPDATE about_me
        SET text = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(updateAboutMeDto.text, existingRecord.id);
    } else {
      // Créer un nouvel enregistrement
      db.prepare(`
        INSERT INTO about_me (id, text, updated_at)
        VALUES (uuid(), ?, datetime('now'))
      `).run(updateAboutMeDto.text);
    }
    
    // Récupérer les données mises à jour
    return this.getAboutMe();
  }

  /**
   * Transforme les données brutes de la base de données en DTO
   * @private
   * @param data Données brutes de la base de données
   * @returns DTO formaté
   */
  private mapToAboutMeDto(data: AboutMeEntity): AboutMeDto {
    return {
      ...data,
      updated_at: new Date(data.updated_at)
    };
  }
} 