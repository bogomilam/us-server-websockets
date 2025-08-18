"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = startWebSocketServer;
const ws_1 = require("ws");
const HISTORY_LIMIT = 50; // max items to send to client
function startWebSocketServer(db, port = 8080) {
    const wss = new ws_1.WebSocketServer({ port });
    wss.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log("🔌 Client connected");
        // Default: send all regions history (7 days)
        try {
            const history = yield db
                .collection("status")
                .find({
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            })
                .sort({ createdAt: 1 })
                .limit(HISTORY_LIMIT)
                .toArray();
            socket.send(JSON.stringify({ type: "history", data: history }));
        }
        catch (err) {
            console.error("❌ Error sending history:", err);
        }
        // Handle messages from client
        socket.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parsed = JSON.parse(msg.toString());
                if (parsed.type === "request_history") {
                    const region = parsed.region;
                    const filter = {
                        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
                    };
                    if (region)
                        filter.region = region;
                    const history = yield db
                        .collection("status")
                        .find(filter)
                        .sort({ createdAt: 1 })
                        .limit(HISTORY_LIMIT)
                        .toArray();
                    socket.send(JSON.stringify({ type: "history", data: history }));
                }
            }
            catch (err) {
                console.error("❌ Error processing client message:", err);
            }
        }));
        socket.on("close", () => {
            console.log("Client disconnected");
        });
    }));
    console.log(`✅ WebSocket server running on ws://localhost:${port}`);
    return wss;
}
//# sourceMappingURL=websocket.js.map