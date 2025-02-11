import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
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
  async logout(): Promise<void> {
    // Note: Avec JWT, la déconnexion est généralement gérée côté client
    // en supprimant le token. Le serveur n'a pas besoin de faire quoi que ce soit.
    return;
  }
} 