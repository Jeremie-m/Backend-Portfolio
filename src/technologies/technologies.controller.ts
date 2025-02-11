import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { TechnologyDto } from './dto/technology.dto';
import { FindTechnologiesDto } from './dto/find-technologies.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TechnologiesService } from './technologies.service';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des technologies' })
  @ApiResponse({
    status: 200,
    description: 'Liste des technologies récupérée avec succès',
    type: [TechnologyDto]
  })
  findAll(@Query() query: FindTechnologiesDto): Promise<{ data: TechnologyDto[]; total: number }> {
    return this.technologiesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une technologie par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Technologie trouvée',
    type: TechnologyDto
  })
  @ApiResponse({
    status: 404,
    description: 'Technologie non trouvée'
  })
  findOne(@Param('id') id: string): Promise<TechnologyDto> {
    return this.technologiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle technologie' })
  @ApiResponse({
    status: 201,
    description: 'Technologie créée avec succès',
    type: TechnologyDto
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  create(@Body() createTechnologyDto: CreateTechnologyDto): Promise<TechnologyDto> {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour une technologie' })
  @ApiResponse({
    status: 200,
    description: 'Technologie mise à jour avec succès',
    type: TechnologyDto
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
    description: 'Technologie non trouvée'
  })
  update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<TechnologyDto> {
    return this.technologiesService.update(id, updateTechnologyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une technologie' })
  @ApiResponse({
    status: 200,
    description: 'Technologie supprimée avec succès'
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
    description: 'Technologie non trouvée'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.technologiesService.remove(id);
  }
} 