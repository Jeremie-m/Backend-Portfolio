import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Database from 'better-sqlite3';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private db;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private initializeDatabase;
    private createTables;
    getDatabase(): Database.Database;
}
