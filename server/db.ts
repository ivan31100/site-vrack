import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, concerts, InsertConcert, photos, InsertPhoto, albums, InsertAlbum, videos, InsertVideo, contactSubmissions, InsertContactSubmission, fileUploads, InsertFileUpload } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Concert queries
export async function getConcerts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(concerts).orderBy(concerts.date);
}

export async function getConcertById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(concerts).where(eq(concerts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createConcert(data: InsertConcert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(concerts).values(data);
  return result;
}

export async function updateConcert(id: number, data: Partial<InsertConcert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(concerts).set(data).where(eq(concerts.id, id));
}

export async function deleteConcert(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(concerts).where(eq(concerts.id, id));
}

// Photo queries
export async function getPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(photos).orderBy(photos.createdAt);
}

export async function getPhotosByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(photos).where(eq(photos.category, category)).orderBy(photos.createdAt);
}

export async function createPhoto(data: InsertPhoto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(photos).values(data);
}

export async function deletePhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(photos).where(eq(photos.id, id));
}

// Album queries
export async function getAlbums() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(albums).orderBy(albums.releaseYear);
}

export async function getAlbumById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(albums).where(eq(albums.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAlbum(data: InsertAlbum) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(albums).values(data);
}

export async function updateAlbum(id: number, data: Partial<InsertAlbum>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(albums).set(data).where(eq(albums.id, id));
}

export async function deleteAlbum(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(albums).where(eq(albums.id, id));
}

// Video queries
export async function getVideos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(videos).orderBy(videos.createdAt);
}

export async function createVideo(data: InsertVideo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(videos).values(data);
}

export async function deleteVideo(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(videos).where(eq(videos.id, id));
}

// Contact submission queries
export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contactSubmissions).values(data);
}

export async function getContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
}

// File upload queries
export async function createFileUpload(data: InsertFileUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(fileUploads).values(data);
}

export async function getUserFileUploads(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(fileUploads).where(eq(fileUploads.userId, userId));
}
