import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.SQLITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SQLITE_DATABASE_URL must be set to a SQLite database file path.");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});
