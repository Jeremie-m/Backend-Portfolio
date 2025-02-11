import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl } from 'class-validator';

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
    description: 'Description méta pour le SEO',
    example: 'Un article sur le développement web avec NestJS',
    required: false
  })
  @IsString()
  @IsOptional()
  meta_description?: string;

  @ApiProperty({
    description: 'URL de l\'image de couverture',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsUrl()
  @IsOptional()
  image_url?: string;

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