import { getTableName, is, SQL } from 'drizzle-orm';
import { CasingCache } from 'drizzle-orm/casing';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { getTableConfig, SQLiteBaseInteger, type SQLiteTable, type TableConfig } from 'drizzle-orm/sqlite-core';

/**
 * SQLite database utilities for Cloudflare D1
 * Consolidates table management, migration, and seeding functionality
 */

// Types
export interface DatabaseTableInfo {
  schema: string;
  name: string;
}

export interface IndexDefinition {
  table: string;
  name: string;
  columns: string[];
  unique: boolean;
  where?: SQL<unknown>;
}

export interface TableSQLDefinition {
  tableName: string;
  schema: string;
  createStatement: string;
  indexStatements: string[];
}

export interface BatchExecutionResult {
  success: boolean;
  results?: D1Result<unknown>[];
  error?: string;
}

// Table Management
export async function getTableList(db: D1Database): Promise<DatabaseTableInfo[]> {
  const result = await db.prepare('PRAGMA table_list').all();
  return result.results
    .filter(table => !['_cf_KV', '_cf_METADATA', 'sqlite_temp_schema'].includes(table.name as string))
    .map(table => ({
      schema: table.schema as string,
      name: table.name as string,
    }));
}

export async function getDropTableStatements(db: D1Database): Promise<string[]> {
  const tables = await getTableList(db);

  return tables.filter(table => !['_cf_KV', 'sqlite_sequence', 'sqlite_schema', 'sqlite_temp_schema'].includes(table.name)).map(table => `DROP TABLE IF EXISTS \`${table.name}\`;`);
}

export async function getClearTableStatements(db: D1Database): Promise<string[]> {
  const tables = await getTableList(db);

  return tables
    .filter(table => !['_cf_KV', 'sqlite_sequence', 'sqlite_schema', 'sqlite_temp_schema'].includes(table.name))
    .flatMap(table => [`DELETE FROM \`${table.name}\`;`, `UPDATE \`sqlite_sequence\` SET \`seq\` = 0 WHERE \`name\` = '${table.name}';`]);
}

// Table Creation from Drizzle Schema
export function generateTableSQL(table: SQLiteTable<TableConfig>): TableSQLDefinition {
  const { name: tableName, columns, indexes, foreignKeys, uniqueConstraints } = getTableConfig(table);
  const indexDefinitions: IndexDefinition[] = [];

  // Generate column definitions
  const columnDefinitions = columns.map(column => {
    const parts = {
      name: column.name,
      type: column.getSQLType(),
      notNull: column.notNull ? ' NOT NULL' : '',
      primary: column.primary ? ' PRIMARY KEY' : '',
      autoincrement: is(column, SQLiteBaseInteger) && column.autoIncrement ? ' AUTOINCREMENT' : '',
      default: column.default ? (is(column.default, SQL) ? ` DEFAULT ${sqlToString(column.default)}` : ` DEFAULT '${column.default}'`) : '',
    };

    // Handle unique constraints on individual columns
    if (column.isUnique && column.uniqueName) {
      indexDefinitions.push({
        table: tableName,
        name: column.uniqueName,
        columns: [column.name],
        unique: true,
      });
    }

    return `\n  \`${parts.name}\` ${parts.type}${parts.primary}${parts.autoincrement}${parts.notNull}${parts.default}`;
  });

  // Generate index definitions
  indexes.forEach(index => {
    indexDefinitions.push({
      table: tableName,
      name: index.config.name,
      columns: index.config.columns.map(col => (typeof col === 'object' && 'name' in col ? col.name : String(col))),
      unique: index.config.unique ?? false,
      where: index.config.where,
    });
  });

  // Generate foreign key constraints
  const foreignKeyDefinitions = foreignKeys.map(key => {
    const reference = key.reference();
    const onDelete = key.onDelete ? ` ON DELETE ${key.onDelete}` : '';
    const onUpdate = key.onUpdate ? ` ON UPDATE ${key.onUpdate}` : '';
    const columnsFrom = reference.columns.map(col => `\`${col.name}\``).join(',');
    const columnsTo = reference.foreignColumns.map(col => `\`${col.name}\``).join(',');
    const tableTo = getTableName(reference.foreignTable);

    return `\n  FOREIGN KEY (${columnsFrom}) REFERENCES \`${tableTo}\`(${columnsTo})${onUpdate}${onDelete}`;
  });

  // Generate unique constraints
  const uniqueConstraintDefinitions = uniqueConstraints
    .filter(constraint => constraint.name)
    .map(constraint => {
      const columns = constraint.columns.map(col => `\`${col.name}\``).join(',');

      if (constraint.name) {
        indexDefinitions.push({
          table: tableName,
          name: constraint.name,
          columns: constraint.columns.map(col => col.name),
          unique: true,
        });
      }

      return `\n  CONSTRAINT ${constraint.name} UNIQUE(${columns})`;
    });

  // Combine all table elements
  const tableElements = [...columnDefinitions, ...foreignKeyDefinitions, ...uniqueConstraintDefinitions];
  const createStatement = `CREATE TABLE \`${tableName}\` (${tableElements.join(',')}\n);`;

  // Generate index statements
  const indexStatements = indexDefinitions.map(index => {
    const indexType = index.unique ? 'UNIQUE INDEX' : 'INDEX';
    const columns = index.columns.map(col => `\`${col}\``).join(',');
    const whereClause = index.where ? ` WHERE ${index.where}` : '';

    return `CREATE ${indexType} \`${index.name}\` ON \`${index.table}\` (${columns})${whereClause};`;
  });

  return { tableName, schema: '', createStatement, indexStatements };
}

export function generateSchemaSQL(schema: Record<string, SQLiteTable<TableConfig>>): string[] {
  const tables = Object.values(schema);
  return tables.flatMap(table => {
    const { createStatement, indexStatements } = generateTableSQL(table);
    return [createStatement, ...indexStatements];
  });
}

// Batch Execution
export async function executeBatch(db: D1Database, statements: string[]): Promise<BatchExecutionResult> {
  if (statements.length === 0) {
    return { success: true, results: [] };
  }

  const sqlStatements = ['PRAGMA defer_foreign_keys = on;', ...statements, 'PRAGMA defer_foreign_keys = off;'];

  try {
    const results = await db.batch(sqlStatements.map(sql => db.prepare(sql)));
    return { success: true, results };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

// Schema Operations
export async function migrateSchema(db: D1Database, schema: Record<string, SQLiteTable<TableConfig>>): Promise<BatchExecutionResult> {
  const dropStatements = await getDropTableStatements(db);
  const createStatements = generateSchemaSQL(schema);
  const allStatements = [...dropStatements, ...createStatements];

  return executeBatch(db, allStatements);
}

export async function dropSchema(db: D1Database): Promise<BatchExecutionResult> {
  const dropStatements = await getDropTableStatements(db);
  return executeBatch(db, dropStatements);
}

export async function clearSchema(db: D1Database): Promise<BatchExecutionResult> {
  const clearStatements = await getClearTableStatements(db);
  return executeBatch(db, clearStatements);
}

// Table-specific operations
export async function clearTable(db: D1Database, tableName: string): Promise<void> {
  await db.exec(`DELETE FROM \`${tableName}\``);
  await db.exec(`UPDATE sqlite_sequence SET seq = 0 WHERE name = '${tableName}'`);
}

export async function seedTable<T extends Record<string, any>>(drizzleDb: DrizzleD1Database<any>, table: SQLiteTable<TableConfig>, data: T[], batchSize = 100): Promise<void> {
  if (data.length === 0) return;

  // Insert data in batches to avoid hitting limits
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await drizzleDb.insert(table).values(batch);
  }
}

// Utility functions
function sqlToString(sql: SQL<unknown>): string {
  return sql.toQuery({
    escapeName: () => {
      throw new Error('Escape name not supported for SQL default values');
    },
    escapeParam: () => {
      throw new Error('Escape param not supported for SQL default values');
    },
    escapeString: () => {
      throw new Error('Escape string not supported for SQL default values');
    },
    casing: new CasingCache
  }).sql;
}
