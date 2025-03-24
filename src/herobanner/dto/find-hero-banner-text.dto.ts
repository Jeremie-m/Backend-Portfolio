import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO pour la recherche de textes de la Hero Banner
 */
export class FindHeroBannerDto {
  /**
   * Terme de recherche pour filtrer les textes
   * @example "Développeur"
   */
  @ApiProperty({
    description: 'Terme de recherche pour filtrer les textes',
    required: false,
    example: 'Développeur'
  })
  @IsString()
  @IsOptional()
  search?: string;

  /**
   * Filtre sur l'état actif des textes
   * @example true
   */
  @ApiProperty({
    description: 'Filtre sur l\'état actif des textes',
    required: false,
    example: true
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  /**
   * Nombre maximum de résultats par page
   * @example 10
   */
  @ApiProperty({
    description: 'Nombre maximum de résultats par page',
    required: false,
    example: 10,
    default: 10
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  /**
   * Numéro de la page à récupérer
   * @example 1
   */
  @ApiProperty({
    description: 'Numéro de la page à récupérer',
    required: false,
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;
} 