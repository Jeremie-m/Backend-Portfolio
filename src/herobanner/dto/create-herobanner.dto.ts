import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO pour la création d'un texte de Hero Banner
 */
export class CreateHeroBannerDto {
  /**
   * Texte à afficher dans la Hero Banner
   * @example "Développeur Full-Stack"
   */
  @ApiProperty({
    description: 'Texte à afficher dans la Hero Banner',
    example: 'Développeur Full-Stack',
    maxLength: 100
  })
  @IsNotEmpty({ message: 'Le texte est requis' })
  @IsString({ message: 'Le texte doit être une chaîne de caractères' })
  @MaxLength(100, { message: 'Le texte ne peut pas dépasser 100 caractères' })
  text: string;

  /**
   * Indique si le texte est actif et doit être affiché
   * @example true
   */
  @ApiProperty({
    description: 'Indique si le texte est actif et doit être affiché',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive doit être un booléen' })
  isActive?: boolean = true;
} 