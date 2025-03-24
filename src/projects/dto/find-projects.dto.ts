import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO pour la recherche de projets
 */
export class FindProjectsDto {
  /**
   * Recherche dans le titre ou la description
   * @example "portfolio"
   */
  @ApiPropertyOptional({
    description: 'Recherche dans le titre ou la description',
    example: 'portfolio'
  })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Nombre d'éléments par page
   * @example 10
   */
  @ApiPropertyOptional({
    description: 'Nombre d\'éléments par page',
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
   * Numéro de page
   * @example 1
   */
  @ApiPropertyOptional({
    description: 'Numéro de page',
    minimum: 1,
    default: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;
} 