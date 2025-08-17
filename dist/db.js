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
exports.connectDB = connectDB;
const mongodb_1 = require("mongodb");
let client;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = process.env.MONGO_URI;
            const dbName = process.env.DB_NAME || "servers-db";
            console.log("🌐 Connecting to MongoDB at:", uri);
            client = new mongodb_1.MongoClient(uri);
            yield client.connect();
            console.log("✅ Connected to MongoDB:", dbName);
            return client.db(dbName);
        }
        catch (err) {
            console.error("❌ MongoDB connection failed:", err);
            throw err;
        }
    });
}
//# sourceMappingURL=db.js.map