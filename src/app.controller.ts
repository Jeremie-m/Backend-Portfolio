import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Page d\'accueil' })
  @ApiResponse({
    status: 200,
    description: 'Informations sur l\'API et ses endpoints',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Portfolio API' },
        version: { type: 'string', example: '1.0.0' },
        description: { type: 'string' },
        documentation: { type: 'string' },
        endpoints: {
          type: 'object',
          properties: {
            projects: { type: 'string' },
            blog: { type: 'string' },
            technologies: { type: 'string' }
          }
        }
      }
    }
  })
  getRoot() {
    return {
      name: 'Portfolio API',
      version: '1.0.0',
      description: 'API pour le portfolio personnel',
      documentation: '/docs',
      endpoints: {
        projects: '/api/projects',
        blog: '/api/blog',
        technologies: '/api/technologies'
      }
    };
  }
} 