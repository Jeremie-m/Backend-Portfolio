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
        "order" INTEGER NOT NULL,
        title TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        skills TEXT NOT NULL,
        github_link TEXT,
        demo_link TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table skills
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS skills (
        id TEXT PRIMARY KEY,
        "order" INTEGER NOT NULL,
        name TEXT UNIQUE NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Création de la table hero_banner_texts
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS hero_banner_texts (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        "order" INTEGER NOT NULL,
        text TEXT NOT NULL UNIQUE,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      const hashedPassword = bcrypt.hashSync(adminPassword, 12);
      
      this.db.prepare(`
        INSERT INTO users (id, email, password, role, created_at)
        VALUES (uuid(), ?, ?, 'admin', datetime('now'))
      `).run(adminEmail, hashedPassword);
      
      console.log('Utilisateur administrateur créé avec les identifiants par défaut');
    }

    // Initialisation des compétences si aucune n'existe
    const skillsCount = this.db.prepare('SELECT COUNT(*) as count FROM skills').get() as CountResult;
    
    if (skillsCount.count === 0) {
      const defaultSkills = [
        { name: "HTML", image_url: "/images/skills/html.svg", order: 1 },
        { name: "CSS", image_url: "/images/skills/css.svg", order: 2 },
        { name: "JavaScript", image_url: "/images/skills/js.svg", order: 3 },
        { name: "Tailwind", image_url: "/images/skills/tailwind.svg", order: 4 },
        { name: "React", image_url: "/images/skills/react.svg", order: 5 },
        { name: "Node.js", image_url: "/images/skills/node.svg", order: 6 },
        { name: "Nest.js", image_url: "/images/skills/nestjs.svg", order: 7 },
        { name: "PostgreSQL", image_url: "/images/skills/postgresql.svg", order: 8 },
        { name: "MongoDB", image_url: "/images/skills/mongodb.svg", order: 9 },
        { name: "Git", image_url: "/images/skills/git.svg", order: 10 },
        { name: "Wave", image_url: "/images/skills/wave.svg", order: 11 },
        { name: "Lighthouse", image_url: "/images/skills/lighthouse.svg", order: 12 },
        { name: "Python", image_url: "/images/skills/python.svg", order: 13 }
      ];
      
      const insertStmt = this.db.prepare(`
        INSERT INTO skills (id, "order", name, image_url)
        VALUES (uuid(), ?, ?, ?)
      `);
      
      defaultSkills.forEach(skill => {
        insertStmt.run(skill.order, skill.name, skill.image_url);
      });
      
      console.log('Compétences initialisées avec les données par défaut');
    }

    // Initialisation des projets si aucun n'existe
    const projectsCount = this.db.prepare('SELECT COUNT(*) as count FROM projects').get() as CountResult;
    
    if (projectsCount.count === 0) {
      const defaultProjects = [
        {
          order: 1,
          title: "Portfolio Personnel",
          description: "Mon portfolio personnel développé avec amour, pour vos beaux yeux.",
          skills: JSON.stringify(["React", "Next.js", "Tailwind", "Nest.js", "SQLite"]),
          github_link: "https://github.com/jeremie-m/portfolio",
          demo_link: "https://jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 2,
          title: "Blog Tech",
          description: "Un blog sur les technologies web et le développement",
          skills: JSON.stringify(["React", "Node.js", "MongoDB"]),
          github_link: "https://github.com/jeremie-m/blog",
          demo_link: "https://blog.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 3,
          title: "Application E-commerce",
          description: "Une application e-commerce complète avec panier et paiement",
          skills: JSON.stringify(["Next.js", "Nest.js", "PostgreSQL"]),
          github_link: "https://github.com/jeremie-m/ecommerce",
          demo_link: "https://shop.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 4,
          title: "Dashboard Admin",
          description: "Un tableau de bord administratif pour gérer les utilisateurs et les produits",
          skills: JSON.stringify(["React", "Redux", "Express", "MongoDB"]),
          github_link: "https://github.com/jeremie-m/admin-dashboard",
          demo_link: "https://admin.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 5,
          title: "API REST",
          description: "Une API REST complète pour gérer les utilisateurs et les produits",
          skills: JSON.stringify(["Node.js", "Express", "MongoDB"]),
          github_link: "https://github.com/jeremie-m/rest-api",
          demo_link: "https://api.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 6,
          title: "Application Mobile",
          description: "Une application mobile pour iOS et Android",
          skills: JSON.stringify(["React Native", "Redux", "Firebase"]),
          github_link: "https://github.com/jeremie-m/mobile-app",
          demo_link: "https://mobile.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 7,
          title: "Plateforme d'Apprentissage",
          description: "Une plateforme e-learning avec gestion de cours, quiz interactifs et suivi de progression pour les apprenants",
          skills: JSON.stringify(["React", "Next.js", "Tailwind", "Node.js", "MongoDB"]),
          github_link: "https://github.com/jeremie-m/e-learning-platform",
          demo_link: "https://apprendre.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 8,
          title: "Gestionnaire de Tâches",
          description: "Application de gestion de tâches collaborative avec fonctionnalités de planification et notifications en temps réel",
          skills: JSON.stringify(["React", "Redux", "Express", "PostgreSQL", "Firebase"]),
          github_link: "https://github.com/jeremie-m/task-manager",
          demo_link: "https://tasks.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        },
        {
          order: 9,
          title: "Application Météo PWA",
          description: "Application météo progressive (PWA) avec géolocalisation et prévisions sur 5 jours, fonctionnant même hors ligne",
          skills: JSON.stringify(["React", "Tailwind", "Node.js", "Express"]),
          github_link: "https://github.com/jeremie-m/weather-pwa",
          demo_link: "https://meteo.jeremie-m.dev",
          image_url: "https://placehold.co/1024x720/png"
        }
      ];
      
      const insertStmt = this.db.prepare(`
        INSERT INTO projects (id, "order", title, description, skills, github_link, demo_link, image_url, created_at)
        VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `);
      
      defaultProjects.forEach(project => {
        insertStmt.run(
          project.order,
          project.title,
          project.description,
          project.skills,
          project.github_link,
          project.demo_link,
          project.image_url
        );
      });
      
      console.log('Projets initialisés avec les données par défaut');
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

    // Initialisation des textes de la Hero Banner si aucun n'existe
    const heroBannerCount = this.db.prepare('SELECT COUNT(*) as count FROM hero_banner_texts').get() as CountResult;
    
    if (heroBannerCount.count === 0) {
      const defaultHeroBannerTexts = [
        { text: "Développeur Full-Stack", isActive: true, order: 1 },
        { text: "Prêt pour l'onboarding", isActive: true, order: 2 },
        { text: "Inscrit sur root-me.org 🏴‍☠️", isActive: true, order: 3 },
        { text: "Papa Level 1", isActive: true, order: 4 },
        { text: "Ouvert aux opportunités", isActive: true, order: 5 },
        { text: "Musicien autodidacte", isActive: true, order: 6 },
        { text: "En train d'apprendre une nouvelle compétence", isActive: true, order: 7 },
        { text: "Auteur de mon propre blog", isActive: false, order: 8 },
        { text: "Le créateur du WarpZone Caen", isActive: true, order: 9 },
        { text: "Amateur de Geocaching", isActive: true, order: 10 }
      ];
      
      const insertStmt = this.db.prepare(`
        INSERT INTO hero_banner_texts (id, "order", text, is_active, created_at)
        VALUES (uuid(), ?, ?, ?, datetime('now'))
      `);
      
      defaultHeroBannerTexts.forEach(item => {
        insertStmt.run(item.order, item.text, item.isActive ? 1 : 0);
      });
      
      console.log('Textes de la Hero Banner initialisés avec les données par défaut');
    }
  }

  

  getDatabase(): Database.Database {
    if (!this.db) {
      throw new Error('La base de données n\'est pas initialisée');
    }
    return this.db;
  }
} 