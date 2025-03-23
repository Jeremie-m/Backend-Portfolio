import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

/**
 * DTO pour la recherche de textes de Hero Banner avec options de filtrage
 */
export class FindHeroBannerDto {
  /**
   * Recherche dans le texte
   * @example "Full-Stack"
   */
  @ApiPropertyOptional({
    description: 'Recherche dans le texte',
    example: 'Full-Stack'
  })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Filtre par statut d'activité
   * @example true
   */
  @ApiPropertyOptional({
    description: 'Filtre par statut d\'activité',
    example: true
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

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