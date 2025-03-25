import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsArray, IsNumber, MinLength, Min } from 'class-validator';

/**
 * DTO pour la création d'un projet
 */
export class CreateProjectDto {
  /**
   * Ordre d'affichage du projet
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage du projet',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: 'L\'ordre doit être un nombre' })
  @Min(1, { message: 'L\'ordre doit être supérieur à 0' })
  order?: number;

  /**
   * Titre du projet
   * @example "Portfolio Personnel"
   */
  @ApiProperty({
    description: 'Titre du projet',
    example: 'Portfolio Personnel'
  })
  @IsNotEmpty({ message: 'Le titre est requis' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le titre doit contenir au moins 3 caractères' })
  title: string;

  /**
   * Description détaillée du projet
   * @example "Un portfolio moderne développé avec React et NestJS"
   */
  @ApiProperty({
    description: 'Description détaillée du projet',
    example: 'Un portfolio moderne développé avec React et NestJS'
  })
  @IsNotEmpty({ message: 'La description est requise' })
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  @MinLength(10, { message: 'La description doit contenir au moins 10 caractères' })
  description: string;

  /**
   * Liste des compétences utilisées dans le projet
   * @example ["React", "NestJS", "TypeScript"]
   */
  @ApiProperty({
    description: 'Liste des compétences utilisées dans le projet',
    example: ['React', 'NestJS', 'TypeScript']
  })
  @IsArray({ message: 'Les compétences doivent être un tableau' })
  @IsString({ each: true, message: 'Chaque compétence doit être une chaîne de caractères' })
  skills: string[];

  /**
   * Lien vers le dépôt GitHub du projet
   * @example "https://github.com/username/project"
   */
  @ApiProperty({
    description: 'Lien vers le dépôt GitHub du projet',
    example: 'https://github.com/username/project',
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsUrl({}, { message: 'Le lien GitHub doit être une URL valide' })
  github_link?: string | null;

  /**
   * Lien vers la démo en ligne du projet
   * @example "https://project-demo.com"
   */
  @ApiProperty({
    description: 'Lien vers la démo en ligne du projet',
    example: 'https://project-demo.com',
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsUrl({}, { message: 'Le lien de démo doit être une URL valide' })
  demo_link?: string | null;

  /**
   * URL de l'image du projet
   * @example "https://example.com/project-image.jpg"
   */
  @ApiProperty({
    description: 'URL de l\'image du projet',
    example: 'https://example.com/project-image.jpg',
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsUrl({}, { message: 'L\'URL de l\'image doit être une URL valide' })
  image_url?: string | null;
} 