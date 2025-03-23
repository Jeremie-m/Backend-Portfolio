import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO pour la recherche de projets avec options de pagination et de tri
 */
export class FindProjectsDto {
  /**
   * Terme de recherche pour filtrer les projets par titre ou description
   * @example portfolio
   */
  @ApiPropertyOptional({
    description: 'Rechercher dans le titre ou la description',
    example: 'portfolio'
  })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Nombre maximum de projets à retourner par page
   * @example 20
   */
  @ApiPropertyOptional({
    description: 'Nombre de projets par page',
    minimum: 1,
    default: 20,
    example: 20
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
   * Ordre de tri des projets par date de création
   * @example desc
   */
  @ApiPropertyOptional({
    description: 'Trier par date de création',
    enum: ['asc', 'desc'],
    default: 'asc',
    example: 'desc'
  })
  @IsOptional()
  @IsString()
  sort?: 'asc' | 'desc' = 'asc';
} 