import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO représentant la réponse d'une authentification réussie
 */
export class AuthResponseDto {
  /**
   * Token d'accès JWT
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   */
  @ApiProperty({
    description: 'Token d\'accès JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;

  /**
   * Type du token
   * @example Bearer
   */
  @ApiProperty({
    description: 'Type du token',
    example: 'Bearer'
  })
  token_type: string;

  /**
   * Durée de validité du token en secondes
   * @example 3600
   */
  @ApiProperty({
    description: 'Durée de validité du token en secondes',
    example: 3600
  })
  expires_in: number;
} 