import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to a SQLite database file path.");
}

const sqlite = new Database(databaseUrl);

export const db = drizzle({
  client: sqlite,
  schema,
});

export { sqlite };
