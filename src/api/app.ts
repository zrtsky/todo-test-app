import mongoose, { ConnectionStates } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export const connectMongo = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  if (mongoose.connection.readyState === ConnectionStates.connected) {
    next()
    return
  }
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/test")
  mongoose.connection.on("connected", () => {
    console.info("Connected to MongoDB")
    next()
  })
}
