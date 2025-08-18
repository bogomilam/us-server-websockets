"use strict";
// import axios from "axios";
// import { Db } from "mongodb";
Object.defineProperty(exports, "__esModule", { value: true });
// const REGIONS = [
//   "us-east",
//   "eu-west",
//   "eu-central",
//   "us-west",
//   "sa-east",
//   "ap-southeast",
// ] as const;
// const urlFor = (region: string) =>
//   `https://data--${region}.upscope.io/status?stats=1`;
// export async function fetchAndStore(db: Db, broadcast: (msg: any) => void) {
//   for (const region of REGIONS) {
//     try {
//       const { data } = await axios.get(urlFor(region), { timeout: 10_000 });
//       const doc = {
//         region,
//         createdAt: new Date(),
//         status: data.status ?? "unknown",
//         serversCount: data.results?.stats?.servers_count ?? null,
//         online: data.results?.stats?.online ?? null,
//         session: data.results?.stats?.session ?? null,
//         cpuLoad: data.results?.stats?.server?.cpu_load ?? null,
//         activeConnections:
//           data.results?.stats?.server?.active_connections ?? null,
//         waitTime: data.results?.stats?.server?.wait_time ?? null,
//         raw: data,
//       };
//       // Insert into DB
//       await db.collection("status").insertOne(doc);
//       // Prune >7 days old
//       await db.collection("status").deleteMany({
//         createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
//       });
//       // Broadcast to all connected clients
//       broadcast({ type: "live", data: doc });
//     } catch (err) {
//       console.error(`❌ Error fetching data for ${region}:`, err);
//     }
//   }
// }
//# sourceMappingURL=fetcher.js.map