/**
 * @fileoverview DTO pour mettre à jour le texte "À propos de moi"
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO pour mettre à jour le texte "À propos de moi"
 */
export class UpdateAboutMeDto {
  /**
   * Nouveau texte de présentation
   * @example Passionné par les nouvelles technologies, j'ai débuté ma vie professionnelle...
   */
  @ApiProperty({
    description: 'Texte de présentation',
    example: 'Passionné par les nouvelles technologies, j\'ai débuté ma vie professionnelle...',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  text: string;
} 