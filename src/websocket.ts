import { WebSocketServer, WebSocket } from "ws";
import { Db } from "mongodb";

export function startWebSocketServer(db: Db, port = 8080): WebSocketServer {
  // Create a single WebSocket server
  const wss = new WebSocketServer({ port });

  wss.on("connection", async (socket: WebSocket) => {
    console.log("🔌 Client connected");

    // Send last 7 days of history when a client connects
    try {
      const history = await db
        .collection("status")
        .find({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        })
        .toArray();

      socket.send(JSON.stringify({ type: "history", data: history }));
    } catch (err) {
      console.error("❌ Error sending history to client:", err);
    }

    // Optionally listen to messages from this client
    socket.on("message", (msg) => {
      console.log("Received message from client:", msg.toString());
    });

    // Handle client disconnect
    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`✅ WebSocket server running on ws://localhost:${port}`);
  return wss; // now correctly returns a WebSocketServer instance
}
