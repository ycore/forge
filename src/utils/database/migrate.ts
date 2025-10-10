import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { SQLiteTable, TableConfig } from 'drizzle-orm/sqlite-core';

import { type BatchExecutionResult, clearSchema, clearTable, dropSchema, migrateSchema, seedTable } from './sqlite-db';

/**
 * Modern database migration utilities
 * All operations return structured results with proper error handling
 */
export interface MigrateOperations {
  migrateSchema(db: D1Database, schema: Record<string, SQLiteTable<TableConfig>>): Promise<BatchExecutionResult>;
  seedTable<T extends Record<string, any>>(drizzleDb: DrizzleD1Database<any>, table: SQLiteTable<TableConfig>, data: T[]): Promise<void>;
  clearTable(db: D1Database, tableName: string): Promise<void>;
  dropSchema(db: D1Database): Promise<BatchExecutionResult>;
  clearSchema(db: D1Database): Promise<BatchExecutionResult>;
}

export const migrate: MigrateOperations = { migrateSchema, seedTable, clearTable, dropSchema, clearSchema };
