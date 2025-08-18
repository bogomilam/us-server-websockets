// src/index.ts
import { MongoClient, Db } from "mongodb";
import { startWebSocketServer } from "./websocket";
import { fetchAndStore } from "./data/fetchData";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const DB_NAME = process.env.DB_NAME;
const FETCH_INTERVAL = 5 * 1000; // 10 sec

let wss: any;

// sends db a broadcast message to all regions clients
function broadcast(message: any) {
  if (!wss) return;
  wss.clients.forEach((client: any) => {
    if (client.readyState === 1) client.send(JSON.stringify(message));
  });
}

async function connectMongo(): Promise<Db> {
  console.log(`🌐 Connecting to MongoDB at: ${MONGO_URI}`);
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
  return client.db(DB_NAME);
}

async function start() {
  try {
    const db = await connectMongo();

    // Start WebSocket server
    wss = startWebSocketServer(db, 8080);

    // Initial fetch
    await fetchAndStore(db, broadcast);

    // Schedule recurring fetches
    setInterval(() => {
      console.log("⏱️ Running scheduled fetch...");
      fetchAndStore(db, broadcast);
    }, FETCH_INTERVAL);
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
}

console.log("🚀 Running src/index.ts");
start();
