import { Db } from "mongodb";
import { ENDPOINTS } from "../config";

/**
 * Fetch data from all endpoints and store in MongoDB
 * @param db - MongoDB database instance
 * @param broadcast - optional callback to broadcast new data
 */
export async function fetchAndStore(db: Db, broadcast?: (msg: any) => void) {
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint.url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();

      const doc = { ...data, endpoint: endpoint.region, createdAt: new Date() };

      await db.collection("status").insertOne(doc);
      console.log(`✅ Fetched ${endpoint.region}`);

      if (broadcast) broadcast({ type: "update", data: doc });
    } catch (err) {
      console.error(`❌ Error fetching ${endpoint.region}:`, err);
    }
  }
}
