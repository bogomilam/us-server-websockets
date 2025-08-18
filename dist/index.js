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
// src/index.ts
const mongodb_1 = require("mongodb");
const websocket_1 = require("./websocket");
const fetchData_1 = require("./data/fetchData");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "servers-db";
const FETCH_INTERVAL = 5 * 1000; // 10 sec
let wss;
// sends db a broadcast message to all regions clients
function broadcast(message) {
    if (!wss)
        return;
    wss.clients.forEach((client) => {
        if (client.readyState === 1)
            client.send(JSON.stringify(message));
    });
}
function connectMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🌐 Connecting to MongoDB at: ${MONGO_URI}`);
        const client = new mongodb_1.MongoClient(MONGO_URI);
        yield client.connect();
        console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
        return client.db(DB_NAME);
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield connectMongo();
            // Start WebSocket server
            wss = (0, websocket_1.startWebSocketServer)(db, 8080);
            // Initial fetch
            yield (0, fetchData_1.fetchAndStore)(db, broadcast);
            // Schedule recurring fetches
            setInterval(() => {
                console.log("⏱️ Running scheduled fetch...");
                (0, fetchData_1.fetchAndStore)(db, broadcast);
            }, FETCH_INTERVAL);
        }
        catch (err) {
            console.error("❌ Error starting server:", err);
        }
    });
}
console.log("🚀 Running src/index.ts");
start();
//# sourceMappingURL=index.js.map