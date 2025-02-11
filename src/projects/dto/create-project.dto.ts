import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Le titre du projet',
    example: 'Mon nouveau projet'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description détaillée du projet',
    example: 'Ce projet est une application web qui...',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Technologies utilisées dans le projet',
    example: 'React, Node.js, MongoDB',
    required: false
  })
  @IsString()
  @IsOptional()
  technologies?: string;

  @ApiProperty({
    description: 'Lien vers le dépôt GitHub du projet',
    example: 'https://github.com/username/project',
    required: false
  })
  @IsUrl()
  @IsOptional()
  github_link?: string;

  @ApiProperty({
    description: 'Lien vers la démo du projet',
    example: 'https://my-project.herokuapp.com',
    required: false
  })
  @IsUrl()
  @IsOptional()
  demo_link?: string;

  @ApiProperty({
    description: 'Catégorie du projet',
    example: 'Web Development',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'URL de l\'image du projet',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsUrl()
  @IsOptional()
  image_url?: string;
} 