import { Server } from "http";
import express from "express";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/";
let server: Server;

const app = express();

const StartServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(5000, () => {
      console.log("welcome to ture club");
    });
  } catch (error) {console.log(error);
  }
};
StartServer();
