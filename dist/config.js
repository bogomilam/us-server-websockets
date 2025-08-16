"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINTS = exports.DB_NAME = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuration for MongoDB connection and other constants
// Ensure to replace with your actual MongoDB URI and database name
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
exports.DB_NAME = process.env.DB_NAME || "servers-db";
exports.ENDPOINTS = [
    { region: "us-east", url: "https://data--us-east.upscope.io/status?stats=1" },
    { region: "eu-west", url: "https://data--eu-west.upscope.io/status?stats=1" },
    {
        region: "eu-central",
        url: "https://data--eu-central.upscope.io/status?stats=1",
    },
    { region: "us-west", url: "https://data--us-west.upscope.io/status?stats=1" },
    { region: "sa-east", url: "https://data--sa-east.upscope.io/status?stats=1" },
    {
        region: "ap-southeast",
        url: "https://data--ap-southeast.upscope.io/status?stats=1",
    },
];
//# sourceMappingURL=config.js.map