import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    ProjectsModule,
    BlogModule,
    TechnologiesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 