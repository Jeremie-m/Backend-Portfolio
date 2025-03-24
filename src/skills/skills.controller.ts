import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SkillDto } from './dto/skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { FindSkillsDto } from './dto/find-skills.dto';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 * Interface de pagination pour les compétences
 */
interface PaginatedSkills {
  data: SkillDto[];
  total: number;
}

/**
 * Contrôleur gérant les opérations CRUD sur les compétences
 */
@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  /**
   * @param skillsService Service des compétences
   */
  constructor(private skillsService: SkillsService) {}

  /**
   * Récupère la liste paginée des compétences
   * @param query Paramètres de filtrage et pagination
   * @returns Liste paginée des compétences
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des compétences' })
  @ApiResponse({
    status: 200,
    description: 'Liste des compétences récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/SkillDto' }
        },
        total: { type: 'number' }
      }
    }
  })
  async findAll(@Query() query: FindSkillsDto): Promise<PaginatedSkills> {
    return this.skillsService.findAll(query);
  }

  /**
   * Récupère une compétence par son identifiant
   * @param id Identifiant de la compétence
   * @returns Compétence trouvée
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une compétence par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Compétence récupérée avec succès',
    type: SkillDto
  })
  @ApiResponse({
    status: 404,
    description: 'Compétence non trouvée'
  })
  async findOne(@Param('id') id: string): Promise<SkillDto> {
    return this.skillsService.findOne(id);
  }

  /**
   * Crée une nouvelle compétence
   * @param createSkillDto Données de la compétence à créer
   * @returns Compétence créée
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle compétence' })
  @ApiResponse({
    status: 201,
    description: 'Compétence créée avec succès',
    type: SkillDto
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou compétence déjà existante'
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillDto> {
    return this.skillsService.create(createSkillDto);
  }

  /**
   * Met à jour une compétence existante
   * @param id Identifiant de la compétence à mettre à jour
   * @param updateSkillDto Données à mettre à jour
   * @returns Compétence mise à jour
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une compétence existante' })
  @ApiResponse({
    status: 200,
    description: 'Compétence mise à jour avec succès',
    type: SkillDto
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou nom déjà utilisé'
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
    description: 'Compétence non trouvée'
  })
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto
  ): Promise<SkillDto> {
    return this.skillsService.update(id, updateSkillDto);
  }

  /**
   * Supprime une compétence
   * @param id Identifiant de la compétence à supprimer
   * @returns Compétence supprimée
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une compétence' })
  @ApiResponse({
    status: 200,
    description: 'Compétence supprimée avec succès'
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
    description: 'Compétence non trouvée'
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.skillsService.remove(id);
  }
} 