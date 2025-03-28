import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration globale des pipes de validation
  app.useGlobalPipes(new ValidationPipe());

  // Préfixe global pour toutes les routes API
  app.setGlobalPrefix('api', {
    exclude: ['/', '/docs'], // Exclure la racine et la documentation du préfixe global
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API pour le portfolio personnel')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/') // Ajout du serveur racine
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Documentation accessible à /docs et /api/docs
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    useGlobalPrefix: true // Utiliser le préfixe global
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    useGlobalPrefix: true // Utiliser le préfixe global
  });

  // Utiliser le port depuis l'environnement ou 3001 par défaut
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 