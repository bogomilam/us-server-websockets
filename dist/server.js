"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importDefault(require("mongoose"));
const ws_1 = __importStar(require("ws"));
const node_cron_1 = __importDefault(require("node-cron"));
// import fetch from "node-fetch";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Mongo connection
mongoose_1.default.connect("mongodb://localhost:27017/status", {
    autoIndex: true,
});
const StatusSchema = new mongoose_1.default.Schema({
    region: String,
    data: Object,
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Status = mongoose_1.default.model("Status", StatusSchema);
// Regions + endpoints
const regions = [
    { id: "us-east", url: "https://data--us-east.upscope.io/status?stats=1" },
    { id: "eu-west", url: "https://data--eu-west.upscope.io/status?stats=1" },
    {
        id: "eu-central",
        url: "https://data--eu-central.upscope.io/status?stats=1",
    },
    { id: "us-west", url: "https://data--us-west.upscope.io/status?stats=1" },
    { id: "sa-east", url: "https://data--sa-east.upscope.io/status?stats=1" },
    {
        id: "ap-southeast",
        url: "https://data--ap-southeast.upscope.io/status?stats=1",
    },
];
// Routine job every minute
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    for (const r of regions) {
        try {
            const res = yield fetch(r.url);
            const json = yield res.json();
            const doc = yield Status.create({ region: r.id, data: json });
            // broadcast to clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws_1.default.OPEN) {
                    client.send(JSON.stringify({
                        region: r.id,
                        data: json,
                        createdAt: doc.createdAt,
                    }));
                }
            });
        }
        catch (e) {
            console.error("Fetch error", r.id, e);
        }
    }
}));
// History endpoint
app.get("/history/:region", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { region } = req.params;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const docs = yield Status.find({
        region,
        createdAt: { $gte: oneWeekAgo },
    }).sort({ createdAt: 1 });
    res.json(docs);
}));
// Start server
const server = app.listen(3001, () => console.log("API running on :3001"));
// WebSocket
const wss = new ws_1.WebSocketServer({ server });
//# sourceMappingURL=server.js.map