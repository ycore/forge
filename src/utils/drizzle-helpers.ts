import { sql } from 'drizzle-orm';
import { integer, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const cuid = (name = 'cuid') =>
  text(name)
    .notNull()
    .unique()
    .$defaultFn(() => nanoid());

export const timestamp = (name: string) => integer(name, { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`);
export const createdAt = timestamp('created_at');
export const updatedAt = timestamp('updated_at');
