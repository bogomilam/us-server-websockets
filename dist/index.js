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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require("express");
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");
    ws.send(JSON.stringify({ message: "Connected to server" }));
    wss.on("request", function (request) {
        console.log("ws received");
        const connection = request.accept(null, request.origin);
        connection.on("message", function (message) {
            console.log("Received Message:", message.utf8Data);
            connection.sendUTF("Hi this is WebSocket server!");
        });
        connection.on("close", function (reasonCode, description) {
            console.log("Client has disconnected.", reasonCode, description);
        });
    });
});
app.get("/api/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, db_1.connectDB)();
    const collection = db.collection("status");
    const result = yield collection.insertOne({ time: new Date(), status: "ok" });
    res.send({ success: true, id: result.insertedId });
}));
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map