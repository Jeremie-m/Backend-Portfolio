import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour représenter une compétence
 */
export class SkillDto {
  /**
   * Identifiant unique de la compétence
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({
    description: 'Identifiant unique de la compétence',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Ordre d'affichage de la compétence
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage de la compétence',
    example: 1
  })
  order: number;

  /**
   * Nom de la compétence
   * @example "React"
   */
  @ApiProperty({
    description: 'Nom de la compétence',
    example: 'React'
  })
  name: string;

  /**
   * URL de l'image de la compétence
   * @example "/images/skills/react.svg"
   */
  @ApiProperty({
    description: 'URL de l\'image de la compétence',
    example: '/images/skills/react.svg',
    required: false,
    nullable: true
  })
  image_url: string | null;

  /**
   * Date de création de la compétence
   * @example "2024-03-24 18:35:15"
   */
  @ApiProperty({
    description: 'Date de création de la compétence',
    example: '2024-03-24 18:35:15'
  })
  created_at: string;
} 