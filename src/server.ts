/* eslint-disable no-console */
import dotenv from "dotenv";
dotenv.config();
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars  } from "./app/config/env";
let server: Server;

const StartServer = async () => {
  console.log(envVars.NODE_ENV);
  
  try {
    await mongoose.connect(envVars.MONGO_URL);
    server = app.listen(envVars.PORT, () => {
      console.log(`welcome to ture club ${envVars.PORT}`);
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
