import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { DatabaseModule } from '../database/database.module';

/**
 * Module regroupant les fonctionnalités liées aux compétences
 */
@Module({
  imports: [DatabaseModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService]
})
export class SkillsModule {} 