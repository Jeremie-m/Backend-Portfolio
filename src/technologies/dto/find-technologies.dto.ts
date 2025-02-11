import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindTechnologiesDto {
  @ApiPropertyOptional({
    description: 'Filtrer par catégorie',
    example: 'Frontend Framework'
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Rechercher dans le nom ou la description',
    example: 'react'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Nombre de technologies par page',
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