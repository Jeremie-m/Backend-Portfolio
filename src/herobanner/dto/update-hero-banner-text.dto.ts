import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * DTO pour la mise à jour d'un texte de la Hero Banner
 */
export class UpdateHeroBannerTextDto {
  /**
   * Ordre d'affichage du texte
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage du texte',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  order?: number;

  /**
   * Contenu du texte
   * @example "Développeur Full-Stack"
   */
  @ApiProperty({
    description: 'Contenu du texte',
    example: 'Développeur Full-Stack',
    required: false
  })
  @IsString({ message: 'Le texte doit être une chaîne de caractères' })
  @MinLength(2, { message: 'Le texte doit contenir au moins 2 caractères' })
  @IsOptional()
  text?: string;

  /**
   * Indique si le texte est actif
   * @example true
   */
  @ApiProperty({
    description: 'Indique si le texte est actif',
    example: true,
    required: false
  })
  @IsBoolean({ message: 'Le statut actif doit être un booléen' })
  @IsOptional()
  is_active?: boolean;
} 