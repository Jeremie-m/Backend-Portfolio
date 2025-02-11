import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDto } from './dto/project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des projets' })
  @ApiResponse({
    status: 200,
    description: 'Liste des projets récupérée avec succès',
    type: [ProjectDto]
  })
  findAll(@Query() query: FindProjectsDto): Promise<{ data: ProjectDto[]; total: number }> {
    return this.projectsService.findAll(query);
  }

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
  findOne(@Param('id') id: string): Promise<ProjectDto> {
    return this.projectsService.findOne(id);
  }

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
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

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
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiResponse({
    status: 200,
    description: 'Projet supprimé avec succès'
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
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
} 