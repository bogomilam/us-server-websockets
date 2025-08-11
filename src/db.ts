import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/websockets-db-url";
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB");
  return client.db(); // returns the 'websockets-db-url' database
}
