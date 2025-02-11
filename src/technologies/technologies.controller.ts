import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { TechnologyDto } from './dto/technology.dto';
import { FindTechnologiesDto } from './dto/find-technologies.dto';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des technologies' })
  @ApiResponse({
    status: 200,
    description: 'Liste des technologies récupérée avec succès',
    type: [TechnologyDto]
  })
  findAll(@Query() query: FindTechnologiesDto): Promise<TechnologyDto[]> {
    // TODO: Implémenter la logique
    return Promise.resolve([]);
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
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle technologie' })
  @ApiResponse({
    status: 201,
    description: 'Technologie créée avec succès',
    type: TechnologyDto
  })
  create(@Body() createTechnologyDto: CreateTechnologyDto): Promise<TechnologyDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une technologie' })
  @ApiResponse({
    status: 200,
    description: 'Technologie mise à jour avec succès',
    type: TechnologyDto
  })
  @ApiResponse({
    status: 404,
    description: 'Technologie non trouvée'
  })
  update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<TechnologyDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une technologie' })
  @ApiResponse({
    status: 200,
    description: 'Technologie supprimée avec succès'
  })
  @ApiResponse({
    status: 404,
    description: 'Technologie non trouvée'
  })
  remove(@Param('id') id: string): Promise<void> {
    // TODO: Implémenter la logique
    return Promise.resolve();
  }
} 