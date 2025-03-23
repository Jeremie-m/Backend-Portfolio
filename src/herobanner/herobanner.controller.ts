import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HeroBannerService } from './herobanner.service';
import { HeroBannerDto, CreateHeroBannerDto, UpdateHeroBannerDto, FindHeroBannerDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 * Interface de pagination pour les textes de Hero Banner
 */
interface PaginatedHeroBanner {
  data: HeroBannerDto[];
  total: number;
}

/**
 * Contrôleur pour la gestion des textes de la Hero Banner
 */
@ApiTags('Hero Banner')
@Controller('herobanner')
export class HeroBannerController {
  /**
   * @param heroBannerService Service de gestion des textes de Hero Banner
   */
  constructor(private readonly heroBannerService: HeroBannerService) {}

  /**
   * Récupère tous les textes de Hero Banner avec filtrage et pagination
   * @param query Paramètres de recherche et pagination
   * @returns Liste paginée des textes de Hero Banner
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des textes de Hero Banner' })
  @ApiResponse({
    status: 200,
    description: 'Liste des textes de Hero Banner récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/HeroBannerDto' }
        },
        total: { type: 'number' }
      }
    }
  })
  async findAll(@Query() query: FindHeroBannerDto): Promise<PaginatedHeroBanner> {
    return this.heroBannerService.findAll(query);
  }

  /**
   * Récupère un texte de Hero Banner par son ID
   * @param id ID du texte à récupérer
   * @returns Le texte de Hero Banner trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un texte de Hero Banner par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Texte de Hero Banner récupéré avec succès',
    type: HeroBannerDto
  })
  @ApiResponse({
    status: 404,
    description: 'Texte de Hero Banner non trouvé'
  })
  async findOne(@Param('id') id: string): Promise<HeroBannerDto> {
    return this.heroBannerService.findOne(id);
  }

  /**
   * Crée un nouveau texte de Hero Banner
   * @param createHeroBannerDto Données du texte à créer
   * @returns Le texte de Hero Banner créé
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau texte de Hero Banner' })
  @ApiResponse({
    status: 201,
    description: 'Texte de Hero Banner créé avec succès',
    type: HeroBannerDto
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou texte déjà existant'
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  async create(@Body() createHeroBannerDto: CreateHeroBannerDto): Promise<HeroBannerDto> {
    return this.heroBannerService.create(createHeroBannerDto);
  }

  /**
   * Met à jour un texte de Hero Banner existant
   * @param id ID du texte à mettre à jour
   * @param updateHeroBannerDto Données de mise à jour
   * @returns Le texte de Hero Banner mis à jour
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un texte de Hero Banner' })
  @ApiResponse({
    status: 200,
    description: 'Texte de Hero Banner mis à jour avec succès',
    type: HeroBannerDto
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou texte déjà utilisé'
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  @ApiResponse({
    status: 404,
    description: 'Texte de Hero Banner non trouvé'
  })
  async update(
    @Param('id') id: string,
    @Body() updateHeroBannerDto: UpdateHeroBannerDto
  ): Promise<HeroBannerDto> {
    return this.heroBannerService.update(id, updateHeroBannerDto);
  }

  /**
   * Supprime un texte de Hero Banner
   * @param id ID du texte à supprimer
   * @returns Le texte de Hero Banner supprimé
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un texte de Hero Banner' })
  @ApiResponse({
    status: 200,
    description: 'Texte de Hero Banner supprimé avec succès',
    type: HeroBannerDto
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  @ApiResponse({
    status: 404,
    description: 'Texte de Hero Banner non trouvé'
  })
  async remove(@Param('id') id: string): Promise<HeroBannerDto> {
    return this.heroBannerService.remove(id);
  }
} 