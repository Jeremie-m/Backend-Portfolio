/**
 * @fileoverview DTO représentant les données "À propos de moi"
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO représentant les données "À propos de moi"
 */
export class AboutMeDto {
  /**
   * Identifiant unique
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty({
    description: 'Identifiant unique',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Texte de présentation
   * @example Passionné par les nouvelles technologies, j'ai débuté ma vie professionnelle...
   */
  @ApiProperty({
    description: 'Texte de présentation',
    example: 'Passionné par les nouvelles technologies, j\'ai débuté ma vie professionnelle...'
  })
  text: string;

  /**
   * Date de dernière mise à jour
   * @example 2024-03-23T10:00:00Z
   */
  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-03-23T10:00:00Z'
  })
  updated_at: Date;
} 