import { Module } from '@nestjs/common';
import { HeroBannerController } from './herobanner.controller';
import { HeroBannerService } from './herobanner.service';
import { DatabaseModule } from '../database/database.module';

/**
 * Module pour la gestion des textes de la Hero Banner
 */
@Module({
  imports: [DatabaseModule],
  controllers: [HeroBannerController],
  providers: [HeroBannerService],
  exports: [HeroBannerService]
})
export class HeroBannerModule {} 