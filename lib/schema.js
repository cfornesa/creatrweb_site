import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const posts = sqliteTable("posts", {
    id: text("id").primaryKey(),
    type: text("type").notNull(),
    slug: text("slug").notNull().unique(),
    title: text("title"),
    content: text("content").notNull(),
    published_at: text("published_at"),
    syndicated_urls: text("syndicated_urls").notNull().default("[]"),
});
export const webmentions = sqliteTable("webmentions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    source: text("source").notNull(),
    target: text("target").notNull(),
    property: text("property"),
    content: text("content"),
    status: text("status").notNull().default("pending"),
    received_at: text("received_at")
        .notNull()
        .default(sql `CURRENT_TIMESTAMP`),
});
export const auth_tokens = sqliteTable("auth_tokens", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    token_hash: text("token_hash").notNull().unique(),
    me: text("me").notNull(),
    scope: text("scope").notNull(),
    issued_at: text("issued_at")
        .notNull()
        .default(sql `CURRENT_TIMESTAMP`),
    expires_at: text("expires_at").notNull(),
});
export const auth_codes = sqliteTable("auth_codes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    code_hash: text("code_hash").notNull().unique(),
    client_id: text("client_id").notNull(),
    redirect_uri: text("redirect_uri").notNull(),
    scope: text("scope").notNull(),
    me: text("me").notNull(),
    expires_at: text("expires_at").notNull(),
});
