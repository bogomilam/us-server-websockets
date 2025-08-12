import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://bogomihaylov:TPFyZgEgSiAu7Oki@us-websockets-cluster.nkepaoh.mongodb.net/?retryWrites=true&w=majority&appName=US-Websockets-Cluster";
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB");
  return client.db(); // returns the 'websockets-db-url' database
}
