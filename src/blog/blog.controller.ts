import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des articles' })
  @ApiResponse({
    status: 200,
    description: 'Liste des articles récupérée avec succès',
    type: [PostDto]
  })
  findAll(@Query() query: FindPostsDto): Promise<PostDto[]> {
    // TODO: Implémenter la logique
    return Promise.resolve([]);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un article par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Article trouvé',
    type: PostDto
  })
  @ApiResponse({
    status: 404,
    description: 'Article non trouvé'
  })
  findOne(@Param('id') id: string): Promise<PostDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel article' })
  @ApiResponse({
    status: 201,
    description: 'Article créé avec succès',
    type: PostDto
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  @ApiResponse({
    status: 403,
    description: 'Non autorisé - Réservé aux administrateurs'
  })
  create(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un article' })
  @ApiResponse({
    status: 200,
    description: 'Article mis à jour avec succès',
    type: PostDto
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
    description: 'Article non trouvé'
  })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    // TODO: Implémenter la logique
    return Promise.resolve(null);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un article' })
  @ApiResponse({
    status: 200,
    description: 'Article supprimé avec succès'
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
    description: 'Article non trouvé'
  })
  remove(@Param('id') id: string): Promise<void> {
    // TODO: Implémenter la logique
    return Promise.resolve();
  }
} 