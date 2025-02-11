import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Titre de l\'article',
    example: 'Mon premier article de blog'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Contenu de l\'article',
    example: 'Ceci est le contenu de mon premier article...'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Image de couverture de l\'article',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({
    description: 'Tags associés à l\'article',
    example: ['développement', 'javascript', 'nestjs'],
    required: false,
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
} 