import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

/**
 * Module de base de données, disponible globalement dans l'application
 */
@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {} 