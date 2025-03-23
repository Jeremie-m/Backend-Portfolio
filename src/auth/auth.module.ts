/**
 * @fileoverview Module d'authentification gérant la connexion et la sécurité de l'application.
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { DatabaseModule } from '../database/database.module';

/**
 * Options de configuration pour la limitation de débit
 */
interface ThrottlerOptions {
  /** Durée de vie en millisecondes pour les limites de requêtes */
  ttl: number;
  /** Nombre maximal de requêtes autorisées dans l'intervalle ttl */
  limit: number;
}

/**
 * Module d'authentification gérant la connexion et la sécurité de l'application
 */
@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    /**
     * Configuration de la limitation de débit spécifiquement pour ce module.
     * La route de login utilise cette configuration pour limiter les tentatives de connexion.
     * @see {@link https://docs.nestjs.com/security/rate-limiting}
     */
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 5, // 5 requêtes maximum
    }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {
  /**
   * @param configService Service de configuration pour accéder aux variables d'environnement
   */
  constructor(private configService: ConfigService) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement');
    }
  }
} 