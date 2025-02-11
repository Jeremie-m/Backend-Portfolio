import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindProjectsDto {
  @ApiPropertyOptional({
    description: 'Filtrer par catégorie',
    example: 'Web Development'
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Rechercher dans le titre ou la description',
    example: 'react'
  })
  @IsOptional()
  @IsString()
  search?: string;

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
} 