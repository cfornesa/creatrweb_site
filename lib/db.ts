import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

export function createDb(databaseUrl: string) {
  const databaseDir = dirname(databaseUrl);

  if (databaseDir !== ".") {
    mkdirSync(databaseDir, { recursive: true });
  }

  const sqlite = new Database(databaseUrl);
  const db = drizzle({
    client: sqlite,
    schema,
  });

  return { db, sqlite };
}
