import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'Connexion à l\'application' })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides'
  })
  login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    // TODO: Implémenter la logique
    return Promise.resolve({
      access_token: 'token',
      token_type: 'Bearer',
      expires_in: 3600
    });
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Déconnexion de l\'application' })
  @ApiResponse({
    status: 200,
    description: 'Déconnexion réussie'
  })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié'
  })
  logout(): Promise<void> {
    // TODO: Implémenter la logique
    return Promise.resolve();
  }
} 