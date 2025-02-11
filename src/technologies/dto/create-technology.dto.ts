import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({
    description: 'Nom de la technologie',
    example: 'React'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Catégorie de la technologie',
    example: 'Frontend Framework',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Description de la technologie',
    example: 'Une bibliothèque JavaScript pour créer des interfaces utilisateurs',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL de l\'icône ou logo de la technologie',
    example: 'https://example.com/react-logo.png',
    required: false
  })
  @IsUrl()
  @IsOptional()
  image_url?: string;
} 