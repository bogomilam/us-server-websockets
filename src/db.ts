import { MongoClient, Db } from "mongodb";

let client: MongoClient;

export async function connectDB(): Promise<Db> {
  try {
    const uri = process.env.MONGO_URI!;
    const dbName = process.env.DB_NAME || "servers-db";

    console.log("🌐 Connecting to MongoDB at:", uri);

    client = new MongoClient(uri);
    await client.connect();

    console.log("✅ Connected to MongoDB:", dbName);

    return client.db(dbName);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}
