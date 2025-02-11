import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDto } from './dto/project.dto';
import { FindProjectsDto } from './dto/find-projects.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des projets' })
  @ApiResponse({
    status: 200,
    description: 'Liste des projets récupérée avec succès',
    type: [ProjectDto]
  })
  findAll(@Query() query: FindProjectsDto): Promise<ProjectDto[]> {
    // TODO: Implémenter la logique
    return Promise.resolve([]);
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
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({
    status: 201,
    description: 'Projet créé avec succès',
    type: ProjectDto
  })
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiResponse({
    status: 200,
    description: 'Projet mis à jour avec succès',
    type: ProjectDto
  })
  @ApiResponse({
    status: 404,
    description: 'Projet non trouvé'
  })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiResponse({
    status: 200,
    description: 'Projet supprimé avec succès'
  })
  @ApiResponse({
    status: 404,
    description: 'Projet non trouvé'
  })
  remove(@Param('id') id: string): Promise<void> {
    // TODO: Implémenter la logique
    return Promise.resolve();
  }
} 