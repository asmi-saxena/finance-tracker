import mongoose from "mongoose"

type GlobalMongoose = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: GlobalMongoose | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please provide a MongoDB URI")
}

const cached: GlobalMongoose = global.mongoose ?? { conn: null, promise: null }
global.mongoose = cached

export async function connectToDatabase(uri?: string) {
  try {
    const mongoUri = uri || MONGODB_URI
    if (cached.conn) {
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }

      cached.promise = mongoose.connect(mongoUri!, opts)
    }

    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
