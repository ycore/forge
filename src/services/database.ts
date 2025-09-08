import { drizzle } from 'drizzle-orm/d1';
import { unstable_createContext, type unstable_RouterContextProvider } from 'react-router';

// Type for the database instance with schema
type DatabaseWithSchema<TSchema extends Record<string, unknown>> =
  ReturnType<typeof drizzle<TSchema>>;

// Database configuration interface
interface DatabaseConfig<TSchema extends Record<string, unknown>> {
  binding: string;
  schema: TSchema;
}

// Create typed database context
export const DatabaseContext = unstable_createContext<DatabaseWithSchema<Record<string, unknown>> | null>(null);

/**
 * Create a typed database connection from Cloudflare environment and binding config
 */
export function bindDatabase<TSchema extends Record<string, unknown>>(env: Cloudflare.Env, binding: string, schema: TSchema) {
  const d1Database = env[binding as keyof Cloudflare.Env] as D1Database;
  return drizzle(d1Database, { schema });
}

/**
 * Initialize database and set it in the router context
 * Consolidates database binding and context setting in one call
 */
export function initDatabase<TSchema extends Record<string, unknown>>(context: Readonly<unstable_RouterContextProvider>, env: Cloudflare.Env, config: DatabaseConfig<TSchema>) {
  const db = bindDatabase(env, config.binding, config.schema);
  context.set(DatabaseContext, db);
  return db;
}

/**
 * Simple database getter function following getBindings pattern
 * Extracts the typed database instance from React Router context
 * @throws Error if database context is not set
 */
export function getDatabase(context: Readonly<unstable_RouterContextProvider>) {
  const db = context.get(DatabaseContext);
  if (!db) {
    throw new Error('Database context not found. Make sure to bind database in your worker entry point.');
  }
  return db;
}
