import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO pour la recherche et pagination des compétences
 */
export class FindSkillsDto {
  /**
   * Filtrer les compétences par catégorie
   * @example Frontend Framework
   */
  @ApiPropertyOptional({
    description: 'Filtrer par catégorie',
    example: 'Frontend Framework'
  })
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * Terme de recherche pour filtrer les compétences par nom ou description
   * @example react
   */
  @ApiPropertyOptional({
    description: 'Rechercher dans le nom ou la description',
    example: 'react'
  })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Nombre maximum de compétences à retourner par page
   * @example 10
   */
  @ApiPropertyOptional({
    description: 'Nombre de compétences par page',
    minimum: 1,
    default: 10,
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  /**
   * Numéro de la page à retourner
   * @example 1
   */
  @ApiPropertyOptional({
    description: 'Numéro de la page',
    minimum: 1,
    default: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  /**
   * Ordre de tri des compétences par nom
   * @example asc
   */
  @ApiPropertyOptional({
    description: 'Trier par nom',
    enum: ['asc', 'desc'],
    default: 'asc',
    example: 'asc'
  })
  @IsOptional()
  @IsString()
  sort?: 'asc' | 'desc' = 'asc';
} 