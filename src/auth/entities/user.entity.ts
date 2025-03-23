import { ApiProperty } from '@nestjs/swagger';

/**
 * Type représentant les rôles possibles d'un utilisateur
 */
export type UserRole = 'admin' | 'user';

/**
 * Entité représentant un utilisateur dans le système
 */
export class User {
  /**
   * Identifiant unique de l'utilisateur
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty({
    description: 'Identifiant unique de l\'utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  /**
   * Email de l'utilisateur
   * @example admin@example.com
   */
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'admin@example.com'
  })
  email: string;

  /**
   * Mot de passe hashé de l'utilisateur
   * @example $2b$10$...
   */
  @ApiProperty({
    description: 'Mot de passe hashé de l\'utilisateur',
    example: '$2b$10$...'
  })
  password: string;

  /**
   * Rôle de l'utilisateur
   * @example admin
   */
  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    example: 'admin',
    enum: ['admin', 'user']
  })
  role: UserRole;

  /**
   * Date de création du compte
   * @example 2024-02-11T10:00:00Z
   */
  @ApiProperty({
    description: 'Date de création du compte',
    example: '2024-02-11T10:00:00Z'
  })
  created_at: Date;
} 