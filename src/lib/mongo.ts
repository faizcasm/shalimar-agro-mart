/* ============================================================
   MongoDB connection — cached across serverless invocations.
   Uses the official driver with a global client so warm
   lambda instances reuse the pool instead of reconnecting.
   ============================================================ */

import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  var __mongoClient: MongoClient | undefined;
}

export function isDbConfigured(): boolean {
  return Boolean(uri);
}

export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  if (!globalThis.__mongoClient) {
    globalThis.__mongoClient = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    });
    await globalThis.__mongoClient.connect();
  }

  return globalThis.__mongoClient.db(process.env.MONGODB_DB || "shalimar_agro");
}
