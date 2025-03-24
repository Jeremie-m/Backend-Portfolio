import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * DTO pour la création d'un texte de la Hero Banner
 */
export class CreateHeroBannerTextDto {
  /**
   * Ordre d'affichage du texte
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage du texte',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty({ message: 'L\'ordre d\'affichage est requis' })
  order: number;

  /**
   * Contenu du texte
   * @example "Développeur Full-Stack"
   */
  @ApiProperty({
    description: 'Contenu du texte',
    example: 'Développeur Full-Stack'
  })
  @IsString({ message: 'Le texte doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le texte est requis' })
  @MinLength(2, { message: 'Le texte doit contenir au moins 2 caractères' })
  text: string;

  /**
   * Indique si le texte est actif
   * @example true
   */
  @ApiProperty({
    description: 'Indique si le texte est actif',
    example: true
  })
  @IsBoolean({ message: 'Le statut actif doit être un booléen' })
  @IsOptional()
  is_active?: boolean = true;
} 