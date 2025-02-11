import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'admin@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'motdepasse123'
  })
  @IsString()
  @MinLength(8)
  password: string;
} 