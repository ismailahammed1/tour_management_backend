import dotenv from "dotenv";
dotenv.config();
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/";
let server: Server;

const StartServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    server = app.listen(5000, () => {
      console.log("welcome to ture club");
    });
  } catch (error) {
    console.log(error);
  }
};
StartServer();

process.on('SIGTERM', (error) => {
  console.log('SIGTERM received...........Server shutting down', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('SIGINT', (error) => {
  console.log('SIGINT received...........Server shutting down', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection...........Server shutting down", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception...........Server shutting down', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// throw new Error();
