import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO pour la mise à jour d'un texte de Hero Banner
 */
export class UpdateHeroBannerDto {
  /**
   * Nouveau texte à afficher dans la Hero Banner
   * @example "Développeur Full-Stack Senior"
   */
  @ApiProperty({
    description: 'Nouveau texte à afficher dans la Hero Banner',
    example: 'Développeur Full-Stack Senior',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Le texte doit être une chaîne de caractères' })
  @MaxLength(100, { message: 'Le texte ne peut pas dépasser 100 caractères' })
  text?: string;

  /**
   * Indique si le texte est actif et doit être affiché
   * @example false
   */
  @ApiProperty({
    description: 'Indique si le texte est actif et doit être affiché',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive doit être un booléen' })
  isActive?: boolean;
} 