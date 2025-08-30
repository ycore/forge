import { drizzle } from 'drizzle-orm/d1';
import { unstable_createContext, type unstable_RouterContextProvider } from 'react-router';

// Type for the database instance with schema
type DatabaseWithSchema<TSchema extends Record<string, any>> = ReturnType<typeof drizzle<TSchema>>;

// Create typed database context for app use
const AppDatabaseContext = unstable_createContext<DatabaseWithSchema<any> | null>(null);

/**
 * Create a typed database connection from Cloudflare environment and binding config
 */
export function bindDatabase<TSchema extends Record<string, any>>(
  env: Cloudflare.Env,
  binding: string,
  schema: TSchema
) {
  const d1Database = env[binding as keyof Cloudflare.Env] as D1Database;
  return drizzle(d1Database, { schema });
}

/**
 * Simple database getter function following getBindings pattern
 * Extracts the typed database instance from React Router context
 * @throws Error if database context is not set
 */
export function getDatabase(context: Readonly<unstable_RouterContextProvider>) {
  const db = context.get(AppDatabaseContext);
  if (!db) {
    throw new Error('Database context not found. Make sure to bind database in your worker entry point.');
  }
  return db;
}

/**
 * Database context for app use
 */
export { AppDatabaseContext as DatabaseContext };