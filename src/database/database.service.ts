import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Database from 'better-sqlite3';
import * as path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private db: Database.Database;

  constructor() {
    this.initializeDatabase();
  }

  async onModuleDestroy() {
    if (this.db) {
      this.db.close();
    }
  }

  private initializeDatabase() {
    try {
      // Créer le dossier data s'il n'existe pas
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      this.db = new Database(path.join(dataDir, 'portfolio.db'));
      
      // Activer les clés étrangères
      this.db.pragma('foreign_keys = ON');

      // Créer la fonction UUID
      this.db.function('uuid', () => crypto.randomUUID());

      // Créer les tables
      this.createTables();
      
      // Mettre à jour les tables existantes si nécessaire
      this.updateTables();

      console.log('Base de données initialisée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la base de données:', error);
      throw error;
    }
  }

  private createTables() {
    // Création de la table projects
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        title TEXT NOT NULL,
        description TEXT,
        technologies TEXT,
        github_link TEXT,
        demo_link TEXT,
        category TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table blog_posts
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        publication_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        tags TEXT,
        meta_description TEXT,
        image_url TEXT
      )
    `);

    // Création de la table technologies
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS technologies (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        name TEXT NOT NULL,
        category TEXT,
        description TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table tags
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        name TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table de relation post_tags
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id TEXT,
        tag_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `);
  }

  private updateTables() {
    // Vérifier si la colonne created_at existe dans la table projects
    const result = this.db.prepare(`
      SELECT COUNT(*) as count 
      FROM pragma_table_info('projects') 
      WHERE name = 'created_at'
    `).get() as { count: number };

    // Si la colonne n'existe pas, l'ajouter et initialiser les valeurs
    if (!result.count) {
      // Créer une table temporaire avec la nouvelle structure
      this.db.exec(`
        CREATE TABLE projects_new (
          id TEXT PRIMARY KEY DEFAULT (uuid()),
          title TEXT NOT NULL,
          description TEXT,
          technologies TEXT,
          github_link TEXT,
          demo_link TEXT,
          category TEXT,
          image_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Copier les données existantes avec la date actuelle
        INSERT INTO projects_new (id, title, description, technologies, github_link, demo_link, category, image_url, created_at)
        SELECT id, title, description, technologies, github_link, demo_link, category, image_url, CURRENT_TIMESTAMP
        FROM projects;

        -- Supprimer l'ancienne table
        DROP TABLE projects;

        -- Renommer la nouvelle table
        ALTER TABLE projects_new RENAME TO projects;
      `);
    }
  }

  getDatabase(): Database.Database {
    return this.db;
  }
} 