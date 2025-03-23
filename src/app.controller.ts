import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Contrôleur principal de l'application
 * Gère les routes racines et de base de l'API
 */
@ApiTags('App')
@Controller()
export class AppController {
  /**
   * Route racine de l'application
   * @returns Un message de bienvenue simple
   */
  @Get()
  @ApiOperation({ summary: 'Page d\'accueil de l\'API' })
  @ApiResponse({
    status: 200,
    description: 'Message de bienvenue',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  })
  getHello(): { message: string } {
    return { message: 'Bienvenue sur l\'API du Portfolio!' };
  }
} 