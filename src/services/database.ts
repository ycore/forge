import { drizzle } from 'drizzle-orm/d1';
import type { Logger as LoggerInterface } from 'drizzle-orm/logger';
import { createContext, type RouterContextProvider } from 'react-router';

import { logger } from '../logger/logger';

type DatabaseWithSchema<TSchema extends Record<string, unknown>> = ReturnType<typeof drizzle<TSchema>>;

export interface DatabaseConfig<TSchema extends Record<string, unknown>> {
  binding: string;
  schema: TSchema;
  enableLogging?: boolean;
}

// Create typed database context
export const DatabaseContext = createContext<DatabaseWithSchema<Record<string, unknown>> | null>(null);

/**
 * Create a typed database connection from Cloudflare environment and binding config
 */
export function bindDatabase<TSchema extends Record<string, unknown>>(env: Cloudflare.Env, binding: string, schema: TSchema, enableLogging = false) {
  const d1Database = env[binding as keyof Cloudflare.Env] as D1Database;
  const drizzleConfig: Parameters<typeof drizzle>[1] = { schema };
  if (enableLogging) {
    drizzleConfig.logger = new Logger();
  }

  return drizzle(d1Database, drizzleConfig);
}

/**
 * Initialize database and set it in the router context
 * Consolidates database binding and context setting in one call
 */
export function initDatabase<TSchema extends Record<string, unknown>>(context: Readonly<RouterContextProvider>, env: Cloudflare.Env, config: DatabaseConfig<TSchema>) {
  const db = bindDatabase(env, config.binding, config.schema, config.enableLogging);
  context.set(DatabaseContext, db);
  return db;
}

/**
 * Simple database getter function following getBindings pattern
 * Extracts the typed database instance from React Router context
 * @throws Error if database context is not set
 */
export function getDatabase(context: Readonly<RouterContextProvider>) {
  const db = context.get(DatabaseContext);
  if (!db) {
    throw new Error('Database context not found. Make sure to bind database in your worker entry point.');
  }
  return db;
}

/**
 * Custom Drizzle logger that integrates with the logger system
 * - Strips newlines, excessive whitespace and replaces double quotes with backticks for cleaner JSON serialization
 */
class Logger implements LoggerInterface {
  logQuery(query: string, params: unknown[]): void {
    const cleanQuery = query
      .replace(/\s*\n\s*/g, ' ') // Remove newlines and surrounding whitespace
      .replace(/"/g, '`') // Replace double quotes with backticks
      .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
      .trim();

    logger.debug('SQL', { query: cleanQuery, params: params.length > 0 ? params : undefined });
  }
}
