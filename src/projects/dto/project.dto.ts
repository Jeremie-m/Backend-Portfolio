import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour représenter un projet
 */
export class ProjectDto {
  /**
   * Identifiant unique du projet
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({
    description: 'Identifiant unique du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Ordre d'affichage du projet
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage du projet',
    example: 1
  })
  order: number;

  /**
   * Titre du projet
   * @example "Portfolio Personnel"
   */
  @ApiProperty({
    description: 'Titre du projet',
    example: 'Portfolio Personnel'
  })
  title: string;

  /**
   * Description détaillée du projet
   * @example "Un portfolio moderne développé avec React et NestJS"
   */
  @ApiProperty({
    description: 'Description détaillée du projet',
    example: 'Un portfolio moderne développé avec React et NestJS'
  })
  description: string;

  /**
   * Liste des compétences utilisées dans le projet
   * @example ["React", "NestJS", "TypeScript"]
   */
  @ApiProperty({
    description: 'Liste des compétences utilisées dans le projet',
    example: ['React', 'NestJS', 'TypeScript']
  })
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
  github_link: string | null;

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
  demo_link: string | null;

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
  image_url: string | null;

  /**
   * Date de création du projet
   * @example "2024-03-23T10:00:00Z"
   */
  @ApiProperty({
    description: 'Date de création du projet',
    example: '2024-03-23T10:00:00Z'
  })
  created_at: string;
} 