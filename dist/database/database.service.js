"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
let DatabaseService = class DatabaseService {
    async onModuleInit() {
        this.initializeDatabase();
    }
    async onModuleDestroy() {
        if (this.db) {
            this.db.close();
        }
    }
    initializeDatabase() {
        try {
            const dataDir = path.join(process.cwd(), 'data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir);
            }
            this.db = new Database(path.join(dataDir, 'portfolio.db'));
            this.db.pragma('foreign_keys = ON');
            this.db.function('uuid', () => crypto.randomUUID());
            this.createTables();
            console.log('Base de données initialisée avec succès');
        }
        catch (error) {
            console.error('Erreur lors de l\'initialisation de la base de données:', error);
            throw error;
        }
    }
    createTables() {
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
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY DEFAULT (uuid()),
        name TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
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
    getDatabase() {
        return this.db;
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map