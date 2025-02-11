import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({
    description: 'Identifiant unique de l\'article',
    example: '1'
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
    description: 'Date de création de l\'article',
    example: '2024-03-15T10:30:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière modification de l\'article',
    example: '2024-03-15T10:30:00Z'
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Image de couverture de l\'article',
    example: 'https://example.com/image.jpg',
    required: false
  })
  coverImage?: string;

  @ApiProperty({
    description: 'Tags associés à l\'article',
    example: ['développement', 'javascript', 'nestjs'],
    required: false,
    type: [String]
  })
  tags?: string[];
} 