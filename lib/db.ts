import "dotenv/config";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const databaseUrl = process.env.SQLITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SQLITE_DATABASE_URL must be set to a SQLite database file path.");
}

const databaseDir = dirname(databaseUrl);

if (databaseDir !== ".") {
  mkdirSync(databaseDir, { recursive: true });
}

const sqlite = new Database(databaseUrl);

export const db = drizzle({
  client: sqlite,
  schema,
});

export { sqlite };
