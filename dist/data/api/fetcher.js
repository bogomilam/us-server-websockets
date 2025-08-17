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
exports.fetchAndStore = fetchAndStore;
const ws_1 = require("ws");
const regions = [
    "us-east",
    "eu-west",
    "eu-central",
    "us-west",
    "sa-east",
    "ap-southeast",
];
// Fetch data for a single region
function fetchRegion(region) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://data--${region}.upscope.io/status?stats=1`;
        const res = yield fetch(url);
        if (!res.ok)
            throw new Error(`Failed to fetch ${region}: ${res.statusText}`);
        return res.json();
    });
}
// Broadcast to all clients connected to a specific region
function broadcastToRegion(wss, region, payload) {
    wss.clients.forEach((client) => {
        if (client.region === region &&
            client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", data: payload }));
        }
    });
}
// Main function
function fetchAndStore(db, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = db.collection("status");
        for (const region of regions) {
            try {
                const data = yield fetchRegion(region);
                const doc = Object.assign(Object.assign({}, data), { createdAt: new Date() });
                // Store in MongoDB
                yield collection.insertOne(doc);
                // Broadcast to WS clients
                broadcastToRegion(wss, region, doc);
                console.log(`✅ Fetched and stored data for ${region} - ${data}`);
            }
            catch (err) {
                console.error(`❌ Error fetching ${region}:`, err);
            }
        }
    });
}
//# sourceMappingURL=fetcher.js.map