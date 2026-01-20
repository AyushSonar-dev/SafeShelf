import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URL;

declare global {
  var mongoosecache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongoosecache) {
  global.mongoosecache = { conn: null, promise: null };
}

const cache = global.mongoosecache;

export default async function dbConnect() {
  if (!MONGO_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }
  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  console.log(`MongoDB connected to ${MONGO_URI}`);
  return cache.conn;
}
