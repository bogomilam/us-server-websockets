import { WebSocketServer, WebSocket } from "ws";
import { Db } from "mongodb";

const HISTORY_LIMIT = 50; // max items to send to client

export function startWebSocketServer(db: Db, port = 8080): WebSocketServer {
  const wss = new WebSocketServer({ port });

  wss.on("connection", async (socket: WebSocket) => {
    console.log("🔌 Client connected");

    // Default: send all regions history (7 days)
    try {
      const history = await db
        .collection("status")
        .find({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        })
        .sort({ createdAt: 1 })
        .limit(HISTORY_LIMIT)
        .toArray();

      socket.send(JSON.stringify({ type: "history", data: history }));
    } catch (err) {
      console.error("❌ Error sending history:", err);
    }

    // Handle messages from client
    socket.on("message", async (msg) => {
      try {
        const parsed = JSON.parse(msg.toString());

        if (parsed.type === "request_history") {
          const region = parsed.region;
          const filter: any = {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          };
          if (region) filter.region = region;

          const history = await db
            .collection("status")
            .find(filter)
            .sort({ createdAt: 1 })
            .limit(HISTORY_LIMIT)
            .toArray();

          socket.send(JSON.stringify({ type: "history", data: history }));
        }
      } catch (err) {
        console.error("❌ Error processing client message:", err);
      }
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`✅ WebSocket server running on ws://localhost:${port}`);
  return wss;
}
