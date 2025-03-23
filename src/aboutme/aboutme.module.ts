/**
 * @fileoverview Module gérant les fonctionnalités "À propos de moi"
 */

import { Module } from '@nestjs/common';
import { AboutMeController } from './aboutme.controller';
import { AboutMeService } from './aboutme.service';
import { DatabaseModule } from '../database/database.module';

/**
 * Module regroupant les fonctionnalités liées à la section "À propos de moi"
 */
@Module({
  imports: [DatabaseModule],
  controllers: [AboutMeController],
  providers: [AboutMeService],
  exports: [AboutMeService]
})
export class AboutMeModule {} 