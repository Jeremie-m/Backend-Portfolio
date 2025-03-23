import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUrl, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO pour la création d'un nouveau projet
 */
export class CreateProjectDto {
  /**
   * Titre du projet
   * @example Nouveau portfolio
   */
  @ApiProperty({ 
    description: 'Titre du projet',
    example: 'Nouveau portfolio'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * Description détaillée du projet
   * @example Un portfolio moderne utilisant les dernières technologies
   */
  @ApiProperty({ 
    description: 'Description détaillée du projet', 
    required: false,
    example: 'Un portfolio moderne utilisant les dernières technologies'
  })
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Compétences utilisées dans le projet
   * @example ["React", "TypeScript", "NestJS"]
   */
  @ApiProperty({ 
    description: 'Compétences utilisées dans le projet', 
    required: false,
    type: [String],
    example: ['React', 'TypeScript', 'NestJS']
  })
  @IsOptional()
  @IsArray()
  skills?: string[];

  /**
   * Lien vers le repository GitHub
   * @example https://github.com/username/portfolio
   */
  @ApiProperty({ 
    description: 'Lien vers le repository GitHub', 
    required: false,
    example: 'https://github.com/username/portfolio'
  })
  @IsOptional()
  @IsUrl()
  github_link?: string;

  /**
   * Lien vers la démo du projet
   * @example https://mon-portfolio.com
   */
  @ApiProperty({ 
    description: 'Lien vers la démo du projet', 
    required: false,
    example: 'https://mon-portfolio.com'
  })
  @IsOptional()
  @IsUrl()
  demo_link?: string;

  /**
   * Catégorie du projet
   * @example Front-end
   */
  @ApiProperty({ 
    description: 'Catégorie du projet', 
    required: false,
    example: 'Front-end'
  })
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * URL de l'image du projet
   * @example https://mon-portfolio.com/images/projet1.jpg
   */
  @ApiProperty({ 
    description: 'URL de l\'image du projet', 
    required: false,
    example: 'https://mon-portfolio.com/images/projet1.jpg'
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;
} 