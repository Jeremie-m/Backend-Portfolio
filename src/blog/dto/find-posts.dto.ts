import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPostsDto {
  @ApiProperty({
    description: 'Terme de recherche pour filtrer les articles',
    required: false,
    example: 'javascript'
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Tags pour filtrer les articles',
    required: false,
    type: [String],
    example: ['développement', 'javascript']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Numéro de la page',
    required: false,
    minimum: 1,
    default: 1,
    example: 1
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Nombre d\'articles par page',
    required: false,
    minimum: 1,
    maximum: 50,
    default: 10,
    example: 10
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
} 