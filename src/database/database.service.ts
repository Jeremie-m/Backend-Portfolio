import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: Database.Database;

  async onModuleInit() {
    this.initializeDatabase();
  }

  async onModuleDestroy() {
    if (this.db) {
      this.db.close();
    }
  }

  private initializeDatabase() {
    try {
      this.db = new Database(path.join(process.cwd(), 'data', 'portfolio.db'));
      
      // Activer les clés étrangères
      this.db.pragma('foreign_keys = ON');

      // Créer la fonction UUID
      this.db.function('uuid', () => crypto.randomUUID());

      // Créer les tables
      this.createTables();

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

  getDatabase(): Database.Database {
    return this.db;
  }
} 