import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour représenter un texte de la Hero Banner
 */
export class HeroBannerTextDto {
  /**
   * Identifiant unique du texte
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({
    description: 'Identifiant unique du texte',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Ordre d'affichage du texte
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage du texte',
    example: 1
  })
  order: number;

  /**
   * Contenu du texte
   * @example "Développeur Full-Stack"
   */
  @ApiProperty({
    description: 'Contenu du texte',
    example: 'Développeur Full-Stack'
  })
  text: string;

  /**
   * Indique si le texte est actif
   * @example true
   */
  @ApiProperty({
    description: 'Indique si le texte est actif',
    example: true
  })
  is_active: boolean;

  /**
   * Date de création du texte
   * @example "2024-03-23T10:00:00Z"
   */
  @ApiProperty({
    description: 'Date de création du texte',
    example: '2024-03-23T10:00:00Z'
  })
  created_at: string;
} 