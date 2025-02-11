import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Identifiant unique de l\'utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'admin@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Mot de passe hashé de l\'utilisateur',
    example: '$2b$10$...'
  })
  password: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    example: 'admin',
    enum: ['admin', 'user']
  })
  role: 'admin' | 'user';

  @ApiProperty({
    description: 'Date de création du compte',
    example: '2024-02-11T10:00:00Z'
  })
  created_at: Date;
} 