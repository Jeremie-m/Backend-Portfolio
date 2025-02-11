import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({
    description: 'Identifiant unique de l\'article',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Titre de l\'article',
    example: 'Mon premier article de blog'
  })
  title: string;

  @ApiProperty({
    description: 'Contenu de l\'article',
    example: 'Ceci est le contenu de mon premier article...'
  })
  content: string;

  @ApiProperty({
    description: 'Date de publication de l\'article',
    example: '2024-03-15T10:30:00Z'
  })
  publication_date: Date;

  @ApiProperty({
    description: 'Description méta pour le SEO',
    example: 'Un article sur le développement web avec NestJS',
    required: false
  })
  meta_description?: string;

  @ApiProperty({
    description: 'URL de l\'image',
    example: 'https://example.com/image.jpg',
    required: false
  })
  image_url?: string;

  @ApiProperty({
    description: 'Tags associés à l\'article',
    example: ['développement', 'javascript', 'nestjs'],
    required: false,
    type: [String]
  })
  tags?: string[];
} 