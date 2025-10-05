import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env")

let isConnected = false

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })

  isConnected = true
}
