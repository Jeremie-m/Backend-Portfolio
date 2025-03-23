/**
 * @fileoverview Contrôleur pour la gestion des projets du portfolio
 * @module projects/controller
 */

import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProjectsService } from './projects.service';

/**
 * Interface de pagination pour les projets
 */
interface PaginatedProjects {
  data: ProjectDto[];
  total: number;
}

/**
 * Contrôleur gérant les opérations CRUD pour les projets
 */
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  /**
   * @constructor
   * @param {ProjectsService} projectsService - Service de gestion des projets
   */
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Récupère tous les projets avec filtrage et pagination
   * @param {FindProjectsDto} query - Paramètres de requête pour le filtrage et la pagination
   * @returns {Promise<PaginatedProjects>} Liste paginée des projets
   */
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des projets' })
  @ApiResponse({
    status: 200,
    description: 'Liste des projets récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ProjectDto' }
        },
        total: { type: 'number' }
      }
    }
  })
  async findAll(@Query() query: FindProjectsDto): Promise<PaginatedProjects> {
    return this.projectsService.findAll(query);
  }

  /**
   * Récupère un projet par son ID
   * @param {string} id - ID du projet à récupérer
   * @returns {Promise<ProjectDto>} Projet trouvé
   */
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un projet par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Projet trouvé',
    type: ProjectDto
  })
  @ApiResponse({
    status: 404,
    description: 'Projet non trouvé'
  })
  async findOne(@Param('id') id: string): Promise<ProjectDto> {
    return this.projectsService.findOne(id);
  }

  /**
   * Crée un nouveau projet
   * @param {CreateProjectDto} createProjectDto - Données du projet à créer
   * @returns {Promise<ProjectDto>} Projet créé
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({
    status: 201,
    description: 'Projet créé avec succès',
    type: ProjectDto
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

  /**
   * Met à jour un projet existant
   * @param {string} id - ID du projet à mettre à jour
   * @param {UpdateProjectDto} updateProjectDto - Données de mise à jour
   * @returns {Promise<ProjectDto>} Projet mis à jour
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiResponse({
    status: 200,
    description: 'Projet mis à jour avec succès',
    type: ProjectDto
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
    description: 'Projet non trouvé'
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<ProjectDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  /**
   * Supprime un projet
   * @param {string} id - ID du projet à supprimer
   * @returns {Promise<ProjectDto>} Projet supprimé
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiResponse({
    status: 200,
    description: 'Projet supprimé avec succès',
    type: ProjectDto
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
    description: 'Projet non trouvé'
  })
  async remove(@Param('id') id: string): Promise<ProjectDto> {
    return this.projectsService.remove(id);
  }
} 