/**
 * @fileoverview Contrôleur gérant les routes API pour les données "À propos de moi"
 */

import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AboutMeDto } from './dto/aboutme.dto';
import { UpdateAboutMeDto } from './dto/update-aboutme.dto';
import { AboutMeService } from './aboutme.service';

/**
 * Contrôleur gérant les opérations sur les données "À propos de moi"
 */
@ApiTags('About Me')
@Controller('about-me')
export class AboutMeController {
  /**
   * @param aboutMeService Service de gestion des données "À propos de moi"
   */
  constructor(private aboutMeService: AboutMeService) {}

  /**
   * Récupère les données "À propos de moi"
   * @returns Les données "À propos de moi"
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer les données "À propos de moi"' })
  @ApiResponse({
    status: 200,
    description: 'Données récupérées avec succès',
    type: AboutMeDto
  })
  @ApiResponse({
    status: 404,
    description: 'Données non trouvées'
  })
  async getAboutMe(): Promise<AboutMeDto> {
    return this.aboutMeService.getAboutMe();
  }

  /**
   * Met à jour les données "À propos de moi"
   * @param updateAboutMeDto Les nouvelles données
   * @returns Les données mises à jour
   */
  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour les données "À propos de moi"' })
  @ApiResponse({
    status: 200,
    description: 'Données mises à jour avec succès',
    type: AboutMeDto
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  async updateAboutMe(@Body() updateAboutMeDto: UpdateAboutMeDto): Promise<AboutMeDto> {
    return this.aboutMeService.updateAboutMe(updateAboutMeDto);
  }
} 