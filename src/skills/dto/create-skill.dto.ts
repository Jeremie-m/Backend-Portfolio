import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber, MinLength, Min } from 'class-validator';

/**
 * DTO pour la création d'une compétence
 */
export class CreateSkillDto {
  /**
   * Ordre d'affichage de la compétence
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage de la compétence',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'L\'ordre doit être un nombre' })
  @Min(1, { message: 'L\'ordre doit être supérieur à 0' })
  order?: number;

  /**
   * Nom de la compétence
   * @example "React"
   */
  @ApiProperty({
    description: 'Nom de la compétence',
    example: 'React'
  })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  name: string;

  /**
   * URL de l'image représentant la compétence
   * @example "https://example.com/react-icon.png"
   */
  @ApiProperty({
    description: 'URL de l\'image représentant la compétence',
    example: 'https://example.com/react-icon.png',
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsUrl({}, { message: 'L\'URL de l\'image doit être une URL valide' })
  image_url?: string | null;
} 