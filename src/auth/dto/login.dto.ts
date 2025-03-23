import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

/**
 * DTO pour la connexion d'un utilisateur
 */
export class LoginDto {
  /**
   * Email de l'utilisateur
   * @example admin@example.com
   */
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'admin@example.com'
  })
  @IsEmail()
  email: string;

  /**
   * Mot de passe de l'utilisateur
   * @example p@ssw0rd123!
   */
  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'p@ssw0rd123!'
  })
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial'
    }
  )
  password: string;
} 