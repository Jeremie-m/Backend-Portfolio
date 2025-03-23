/**
 * @fileoverview Module principal de l'application qui configure et connecte tous les modules du système.
 * @module app/module
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// La configuration du ThrottlerModule sera faite au niveau du module AuthModule
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { AboutMeModule } from './aboutme/aboutme.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';

/**
 * Module racine de l'application qui intègre tous les sous-modules fonctionnels.
 * Ce module configure les paramètres globaux de l'application et relie tous les sous-modules.
 */
@Module({
  imports: [
    /**
     * Configuration des variables d'environnement, rendues accessibles globalement
     * @see {@link https://docs.nestjs.com/techniques/configuration}
     */
    ConfigModule.forRoot({
      isGlobal: true, // Rend la configuration disponible dans tous les modules
    }),
    
    /** Module de gestion de la base de données */
    DatabaseModule,

    /** Module de gestion de la section "À propos de moi" */
    AboutMeModule,
    
    /** Module de gestion des projets du portfolio */
    ProjectsModule,
    
    /** Module de gestion des compétences */
    SkillsModule,
    
    /** Module d'authentification et de sécurité */
    AuthModule,
  ],
  
  /** Contrôleurs au niveau de l'application principale */
  controllers: [AppController],
})
export class AppModule {} 