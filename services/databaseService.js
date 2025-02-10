import Database from 'better-sqlite3';
import path from 'path';

class DatabaseService {
  constructor() {
    this.db = null;
  }

  initialize() {
    if (this.db) return;

    try {
      // Connexion à la base de données
      this.db = new Database(path.join(process.cwd(), 'data', 'portfolio.db'));
      
      // Activer les clés étrangères
      this.db.pragma('foreign_keys = ON');

      // Créer les tables si elles n'existent pas
      this.createTables();

      console.log('Base de données initialisée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la base de données:', error);
      throw error;
    }
  }

  createTables() {
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
        image_url TEXT
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
        image_url TEXT
      )
    `);

    // Création de la table tags (optionnelle)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        name TEXT NOT NULL UNIQUE
      )
    `);

    // Création de la table de relation post_tags
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id TEXT,
        tag_id TEXT,
        FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `);
  }

  // Méthode pour obtenir une instance de la base de données
  getDatabase() {
    if (!this.db) {
      this.initialize();
    }
    return this.db;
  }

  // Méthode pour fermer la connexion
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Export d'une instance unique (pattern Singleton)
export const databaseService = new DatabaseService(); 