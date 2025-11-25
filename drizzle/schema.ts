import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Concerts table for managing concert events
 */
export const concerts = mysqlTable("concerts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }),
  location: varchar("location", { length: 255 }).notNull(),
  address: text("address"),
  ticketUrl: varchar("ticketUrl", { length: 500 }),
  imageKey: varchar("imageKey", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Concert = typeof concerts.$inferSelect;
export type InsertConcert = typeof concerts.$inferInsert;

/**
 * Photos table for managing photo gallery
 */
export const photos = mysqlTable("photos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  imageKey: varchar("imageKey", { length: 500 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = typeof photos.$inferInsert;

/**
 * Albums table for managing music albums
 */
export const albums = mysqlTable("albums", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  releaseYear: int("releaseYear").notNull(),
  spotifyId: varchar("spotifyId", { length: 255 }),
  spotifyUrl: varchar("spotifyUrl", { length: 500 }),
  coverImageKey: varchar("coverImageKey", { length: 500 }),
  coverImageUrl: varchar("coverImageUrl", { length: 500 }),
  trackCount: int("trackCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Album = typeof albums.$inferSelect;
export type InsertAlbum = typeof albums.$inferInsert;

/**
 * Videos table for managing video content
 */
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  youtubeId: varchar("youtubeId", { length: 255 }).notNull(),
  youtubeUrl: varchar("youtubeUrl", { length: 500 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

/**
 * File uploads table for tracking uploaded files
 */
export const fileUploads = mysqlTable("fileUploads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: int("fileSize"),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = typeof fileUploads.$inferInsert;

/**
 * Contact submissions table
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;