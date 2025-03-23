/**
 * @fileoverview Contrôleur gérant les routes d'authentification de l'application.
 */

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';

/**
 * Contrôleur gérant les opérations d'authentification comme la connexion
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /**
   * @param authService Service d'authentification
   */
  constructor(private authService: AuthService) {}

  /**
   * Gère la connexion d'un utilisateur
   * @param loginDto Données d'identification de l'utilisateur
   * @returns Informations d'authentification avec token JWT
   * @throws UnauthorizedException Si les identifiants sont incorrects
   */
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Connexion à l\'application' })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides'
  })
  @ApiResponse({
    status: 429,
    description: 'Trop de tentatives de connexion. Veuillez réessayer dans 1 minute.'
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
} 