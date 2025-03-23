import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO représentant un projet
 */
export class ProjectDto {
  /**
   * Identifiant unique du projet
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty({ 
    description: 'Identifiant unique du projet',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Titre du projet
   * @example Portfolio personnel
   */
  @ApiProperty({ 
    description: 'Titre du projet',
    example: 'Portfolio personnel'
  })
  title: string;

  /**
   * Description détaillée du projet
   * @example Un portfolio pour présenter mes projets et compétences
   */
  @ApiProperty({ 
    description: 'Description détaillée du projet', 
    required: false,
    example: 'Un portfolio pour présenter mes projets et compétences'
  })
  description?: string;

  /**
   * Compétences utilisées dans le projet
   * @example ["React", "Node.js", "TypeScript"]
   */
  @ApiProperty({ 
    description: 'Compétences utilisées dans le projet', 
    required: false,
    type: [String],
    example: ['React', 'Node.js', 'TypeScript']
  })
  skills: string[];

  /**
   * Lien vers le repository GitHub
   * @example https://github.com/username/project
   */
  @ApiProperty({ 
    description: 'Lien vers le repository GitHub', 
    required: false,
    example: 'https://github.com/username/project'
  })
  github_link?: string;

  /**
   * Lien vers la démo du projet
   * @example https://project-demo.com
   */
  @ApiProperty({ 
    description: 'Lien vers la démo du projet', 
    required: false,
    example: 'https://project-demo.com'
  })
  demo_link?: string;

  /**
   * Catégorie du projet
   * @example Web Development
   */
  @ApiProperty({ 
    description: 'Catégorie du projet', 
    required: false,
    example: 'Web Development'
  })
  category?: string;

  /**
   * URL de l'image du projet
   * @example https://example.com/project-image.jpg
   */
  @ApiProperty({ 
    description: 'URL de l\'image du projet', 
    required: false,
    example: 'https://example.com/project-image.jpg'
  })
  image_url?: string;

  /**
   * Date de création du projet
   * @example 2024-03-15T10:00:00Z
   */
  @ApiProperty({ 
    description: 'Date de création du projet',
    example: '2024-03-15T10:00:00Z'
  })
  created_at: Date;
} 