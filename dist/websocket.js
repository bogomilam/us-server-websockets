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
exports.createWebSocketServer = createWebSocketServer;
const ws_1 = require("ws");
function createWebSocketServer(db) {
    const wss = new ws_1.WebSocketServer({ port: 8080 });
    wss.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log("🔌 Client connected");
        // Send last 7 days of history
        const history = yield db
            .collection("status")
            .find({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        })
            .toArray();
        socket.send(JSON.stringify({ type: "history", data: history }));
    }));
    console.log("✅ WebSocket server running on ws://localhost:8080");
    return wss;
}
//# sourceMappingURL=websocket.js.map