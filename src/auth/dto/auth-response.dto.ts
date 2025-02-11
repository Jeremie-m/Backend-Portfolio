import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token d\'accès JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;

  @ApiProperty({
    description: 'Type du token',
    example: 'Bearer'
  })
  token_type: string;

  @ApiProperty({
    description: 'Durée de validité du token en secondes',
    example: 3600
  })
  expires_in: number;
} 