// import express from "express";
// import mongoose from "mongoose";
// import WebSocket, { WebSocketServer } from "ws";
// import cron from "node-cron";
// // import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// app.use(cors());

// // Mongo connection
// mongoose.connect("mongodb://localhost:27017/status", {
//   autoIndex: true,
// });

// interface IStatus {
//   region: string;
//   data: any;
//   createdAt: Date;
// }

// const StatusSchema = new mongoose.Schema<IStatus>(
//   {
//     region: String,
//     data: Object,
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const Status = mongoose.model<IStatus>("Status", StatusSchema);

// // Regions + endpoints
// const regions = [
//   { id: "us-east", url: "https://data--us-east.upscope.io/status?stats=1" },
//   { id: "eu-west", url: "https://data--eu-west.upscope.io/status?stats=1" },
//   {
//     id: "eu-central",
//     url: "https://data--eu-central.upscope.io/status?stats=1",
//   },
//   { id: "us-west", url: "https://data--us-west.upscope.io/status?stats=1" },
//   { id: "sa-east", url: "https://data--sa-east.upscope.io/status?stats=1" },
//   {
//     id: "ap-southeast",
//     url: "https://data--ap-southeast.upscope.io/status?stats=1",
//   },
// ];

// // Routine job every minute
// cron.schedule("* * * * *", async () => {
//   for (const r of regions) {
//     try {
//       const res = await fetch(r.url);
//       const json = await res.json();

//       const doc = await Status.create({ region: r.id, data: json });

//       // broadcast to clients
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(
//             JSON.stringify({
//               region: r.id,
//               data: json,
//               createdAt: doc.createdAt,
//             })
//           );
//         }
//       });
//     } catch (e) {
//       console.error("Fetch error", r.id, e);
//     }
//   }
// });

// // History endpoint
// app.get("/history/:region", async (req, res) => {
//   const { region } = req.params;
//   const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//   const docs = await Status.find({
//     region,
//     createdAt: { $gte: oneWeekAgo },
//   }).sort({ createdAt: 1 });
//   res.json(docs);
// });

// // Start server
// const server = app.listen(3001, () => console.log("API running on :3001"));

// // WebSocket
// const wss = new WebSocketServer({ server });
