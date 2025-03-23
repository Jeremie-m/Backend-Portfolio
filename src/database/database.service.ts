import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';

interface CountResult {
  count: number;
}

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private db: Database.Database | null = null;

  constructor() {
    this.initializeDatabase();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.db) {
      this.db.close();
    }
  }

  private initializeDatabase(): void {
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

  private createTables(): void {
    if (!this.db) return;

    // Création de la table projects
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        description TEXT,
        skills TEXT,
        github_link TEXT,
        demo_link TEXT,
        category TEXT,
        image_url TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // Création de la table skills
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS skills (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        category TEXT,
        description TEXT,
        image_url TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // Création de la table des utilisateurs
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table about_me
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS about_me (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);
  }

  private updateTables(): void {    
    if (!this.db) return;

    // Créer un administrateur par défaut si aucun n'existe
    const adminCount = this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin') as CountResult;
    
    if (adminCount.count === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'P@ssw0rd123!';
      const hashedPassword = bcrypt.hashSync(adminPassword, 12); // Augmentation du salt à 12 pour plus de sécurité
      
      this.db.prepare(`
        INSERT INTO users (id, email, password, role, created_at)
        VALUES (uuid(), ?, ?, 'admin', datetime('now'))
      `).run(adminEmail, hashedPassword);
      
      console.log('Utilisateur administrateur créé avec les identifiants par défaut');
    }

    // Initialisation des données "À propos de moi" si aucune n'existe
    const aboutMeCount = this.db.prepare('SELECT COUNT(*) as count FROM about_me').get() as CountResult;
    
    if (aboutMeCount.count === 0) {
      const defaultAboutMeText = `Passionné par les nouvelles technologies, j'ai débuté ma vie professionnelle en tant que technicien informatique, avant d'innover et de faire naître le premier bar eSport de Normandie, le WarpZone.

Cette expérience unique et entrepreneuriale m'a appris à jongler avec plusieurs casquettes et à faire preuve d'une grande adaptation, et ce durant sept belles années.

Fort de cette aventure, j'ai décidé de quitter le monde de la nuit pour me réorienter vers le développement web.

Aujourd'hui, en tant que développeur full-stack junior, je me suis familiarisé avec le front-end (HTML, CSS, Tailwind, React et Next.js) ainsi qu'avec le back-end (Node.js, Express, Nest.js, MongoDB, PostgreSQL).

Je peux aussi collaborer efficacement avec les équipes créatives grâce à mes compétences en Photoshop et Figma.`;
      
      this.db.prepare(`
        INSERT INTO about_me (id, text, updated_at)
        VALUES (uuid(), ?, datetime('now'))
      `).run(defaultAboutMeText);
      
      console.log('Données "À propos de moi" initialisées avec le texte par défaut');
    }
  }

  getDatabase(): Database.Database {
    if (!this.db) {
      throw new Error('La base de données n\'est pas initialisée');
    }
    return this.db;
  }
} 