// src/utils/config-merge.ts
function isObject(item) {
  return Boolean(item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Date));
}
function hasNameProperty(obj) {
  return isObject(obj) && typeof obj.name === "string";
}
function mergeArrays(target, source) {
  const hasNamedObjects = target.every(hasNameProperty) && source.every(hasNameProperty);
  if (hasNamedObjects) {
    const result = [...target];
    const resultMap = new Map;
    result.forEach((item, index) => {
      if (hasNameProperty(item)) {
        resultMap.set(item.name, index);
      }
    });
    for (const sourceItem of source) {
      if (!hasNameProperty(sourceItem))
        continue;
      const name = sourceItem.name;
      const existingIndex = resultMap.get(name);
      if (existingIndex !== undefined) {
        result[existingIndex] = deepMerge(result[existingIndex], sourceItem);
      } else {
        result.push(sourceItem);
        resultMap.set(name, result.length - 1);
      }
    }
    return result;
  }
  return source;
}
function deepClone(obj) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (obj instanceof Date)
    return new Date(obj.getTime());
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  if (typeof obj === "function")
    return obj;
  const clonedObj = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}
function deepMerge(target, ...sources) {
  if (!sources.length)
    return target;
  const result = deepClone(target);
  for (const source of sources) {
    if (!source)
      continue;
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (sourceValue === undefined)
        continue;
      if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        result[key] = mergeArrays(targetValue, sourceValue);
      } else if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }
  return result;
}
// src/utils/database/sqlite-db.ts
import { getTableName, is, SQL } from "drizzle-orm";
import { CasingCache } from "drizzle-orm/casing";
import { getTableConfig, SQLiteBaseInteger } from "drizzle-orm/sqlite-core";
async function getTableList(db) {
  const result = await db.prepare("PRAGMA table_list").all();
  return result.results.filter((table) => !["_cf_KV", "_cf_METADATA", "sqlite_temp_schema"].includes(table.name)).map((table) => ({
    schema: table.schema,
    name: table.name
  }));
}
async function getDropTableStatements(db) {
  const tables = await getTableList(db);
  return tables.filter((table) => !["_cf_KV", "sqlite_sequence", "sqlite_schema", "sqlite_temp_schema"].includes(table.name)).map((table) => `DROP TABLE IF EXISTS \`${table.name}\`;`);
}
async function getClearTableStatements(db) {
  const tables = await getTableList(db);
  return tables.filter((table) => !["_cf_KV", "sqlite_sequence", "sqlite_schema", "sqlite_temp_schema"].includes(table.name)).flatMap((table) => [`DELETE FROM \`${table.name}\`;`, `UPDATE \`sqlite_sequence\` SET \`seq\` = 0 WHERE \`name\` = '${table.name}';`]);
}
function generateTableSQL(table) {
  const { name: tableName, columns, indexes, foreignKeys, uniqueConstraints } = getTableConfig(table);
  const indexDefinitions = [];
  const columnDefinitions = columns.map((column) => {
    const parts = {
      name: column.name,
      type: column.getSQLType(),
      notNull: column.notNull ? " NOT NULL" : "",
      primary: column.primary ? " PRIMARY KEY" : "",
      autoincrement: is(column, SQLiteBaseInteger) && column.autoIncrement ? " AUTOINCREMENT" : "",
      default: column.default ? is(column.default, SQL) ? ` DEFAULT ${sqlToString(column.default)}` : ` DEFAULT '${column.default}'` : ""
    };
    if (column.isUnique && column.uniqueName) {
      indexDefinitions.push({
        table: tableName,
        name: column.uniqueName,
        columns: [column.name],
        unique: true
      });
    }
    return `
  \`${parts.name}\` ${parts.type}${parts.primary}${parts.autoincrement}${parts.notNull}${parts.default}`;
  });
  indexes.forEach((index) => {
    indexDefinitions.push({
      table: tableName,
      name: index.config.name,
      columns: index.config.columns.map((col) => typeof col === "object" && ("name" in col) ? col.name : String(col)),
      unique: index.config.unique ?? false,
      where: index.config.where
    });
  });
  const foreignKeyDefinitions = foreignKeys.map((key) => {
    const reference = key.reference();
    const onDelete = key.onDelete ? ` ON DELETE ${key.onDelete}` : "";
    const onUpdate = key.onUpdate ? ` ON UPDATE ${key.onUpdate}` : "";
    const columnsFrom = reference.columns.map((col) => `\`${col.name}\``).join(",");
    const columnsTo = reference.foreignColumns.map((col) => `\`${col.name}\``).join(",");
    const tableTo = getTableName(reference.foreignTable);
    return `
  FOREIGN KEY (${columnsFrom}) REFERENCES \`${tableTo}\`(${columnsTo})${onUpdate}${onDelete}`;
  });
  const uniqueConstraintDefinitions = uniqueConstraints.filter((constraint) => constraint.name).map((constraint) => {
    const columns2 = constraint.columns.map((col) => `\`${col.name}\``).join(",");
    if (constraint.name) {
      indexDefinitions.push({
        table: tableName,
        name: constraint.name,
        columns: constraint.columns.map((col) => col.name),
        unique: true
      });
    }
    return `
  CONSTRAINT ${constraint.name} UNIQUE(${columns2})`;
  });
  const tableElements = [...columnDefinitions, ...foreignKeyDefinitions, ...uniqueConstraintDefinitions];
  const createStatement = `CREATE TABLE \`${tableName}\` (${tableElements.join(",")}
);`;
  const indexStatements = indexDefinitions.map((index) => {
    const indexType = index.unique ? "UNIQUE INDEX" : "INDEX";
    const columns2 = index.columns.map((col) => `\`${col}\``).join(",");
    const whereClause = index.where ? ` WHERE ${index.where}` : "";
    return `CREATE ${indexType} \`${index.name}\` ON \`${index.table}\` (${columns2})${whereClause};`;
  });
  return { tableName, schema: "", createStatement, indexStatements };
}
function generateSchemaSQL(schema) {
  const tables = Object.values(schema);
  return tables.flatMap((table) => {
    const { createStatement, indexStatements } = generateTableSQL(table);
    return [createStatement, ...indexStatements];
  });
}
async function executeBatch(db, statements) {
  if (statements.length === 0) {
    return { success: true, results: [] };
  }
  const sqlStatements = ["PRAGMA defer_foreign_keys = on;", ...statements, "PRAGMA defer_foreign_keys = off;"];
  try {
    const results = await db.batch(sqlStatements.map((sql) => db.prepare(sql)));
    return { success: true, results };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}
async function migrateSchema(db, schema) {
  const dropStatements = await getDropTableStatements(db);
  const createStatements = generateSchemaSQL(schema);
  const allStatements = [...dropStatements, ...createStatements];
  return executeBatch(db, allStatements);
}
async function dropSchema(db) {
  const dropStatements = await getDropTableStatements(db);
  return executeBatch(db, dropStatements);
}
async function clearSchema(db) {
  const clearStatements = await getClearTableStatements(db);
  return executeBatch(db, clearStatements);
}
async function clearTable(db, tableName) {
  await db.exec(`DELETE FROM \`${tableName}\``);
  await db.exec(`UPDATE sqlite_sequence SET seq = 0 WHERE name = '${tableName}'`);
}
async function seedTable(drizzleDb, table, data, batchSize = 100) {
  if (data.length === 0)
    return;
  for (let i = 0;i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await drizzleDb.insert(table).values(batch);
  }
}
function sqlToString(sql) {
  return sql.toQuery({
    escapeName: () => {
      throw new Error("Escape name not supported for SQL default values");
    },
    escapeParam: () => {
      throw new Error("Escape param not supported for SQL default values");
    },
    escapeString: () => {
      throw new Error("Escape string not supported for SQL default values");
    },
    casing: new CasingCache
  }).sql;
}

// src/utils/database/migrate.ts
var migrate = { migrateSchema, seedTable, clearTable, dropSchema, clearSchema };
// src/utils/date-timestamp.ts
function getCurrentTimestamp() {
  return Date.now();
}
function addTimeToNow(timeInSeconds) {
  return getCurrentTimestamp() + timeInSeconds * 1000;
}
function isExpired(expirationTimestamp) {
  return getCurrentTimestamp() > expirationTimestamp;
}
// src/utils/drizzle-helpers.ts
import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
var cuid = (name = "cuid") => text(name).notNull().unique().$defaultFn(() => nanoid());
var timestamp = (name) => integer(name, { mode: "timestamp" }).notNull().default(sql`(unixepoch())`);
var createdAt = timestamp("created_at");
var updatedAt = timestamp("updated_at");
export {
  updatedAt,
  timestamp,
  seedTable,
  migrateSchema,
  migrate,
  isExpired,
  getTableList,
  getDropTableStatements,
  getCurrentTimestamp,
  getClearTableStatements,
  executeBatch,
  dropSchema,
  deepMerge,
  cuid,
  createdAt,
  clearTable,
  clearSchema,
  addTimeToNow
};

//# debugId=CB345D056F3BDA6B64756E2164756E21
