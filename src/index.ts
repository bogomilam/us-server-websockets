import express from "express";
// const express = require("express");
import http from "http";
import { WebSocketServer } from "ws";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");
  ws.send(JSON.stringify({ message: "Connected to server" }));
});

app.get("/api/save", async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("status");

  const result = await collection.insertOne({ time: new Date(), status: "ok" });

  res.send({ success: true, id: result.insertedId });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
