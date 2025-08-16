import dotenv from "dotenv";
dotenv.config();

// Configuration for MongoDB connection and other constants
// Ensure to replace with your actual MongoDB URI and database name
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME || "servers-db";

export interface Endpoint {
  name: string;
  url: string;
}

export const ENDPOINTS = [
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
