import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend la configuration disponible dans tous les modules
    }),
    DatabaseModule,
    ProjectsModule,
    BlogModule,
    TechnologiesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 