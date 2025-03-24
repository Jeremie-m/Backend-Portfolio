import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, MinLength, IsNumber, Min } from 'class-validator';

/**
 * DTO pour la mise à jour d'une compétence
 */
export class UpdateSkillDto {
  /**
   * Ordre d'affichage de la compétence
   * @example 1
   */
  @ApiProperty({
    description: 'Ordre d\'affichage de la compétence',
    example: 1,
    required: false
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
    example: 'React',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  name?: string;

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
  @IsOptional()
  @IsUrl({}, { message: 'L\'URL de l\'image doit être une URL valide' })
  image_url?: string | null;
} 