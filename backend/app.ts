import "dotenv/config";
import express from "express";
import { requestLogger } from "./api/middleware/logger.js";
import mongoose from "mongoose";
import authRoutes from "./api/routes/authRoutes.js";
import cors from "cors";
import moduleRoutes from "./api/routes/moduleRoutes.js";

console.log("Starting Server");

// Env Vars
const port = process.env.PORT || 3000;
const mongo_cs = process.env.MONGO_CS;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/", authRoutes);
app.use("/", moduleRoutes);
app.get("/", (req, res) => {
  res.status(201).send("Twill server is healthy.");
});

// Run
const run = async () => {
  try {
    console.log("Connecting to DB...");

    await mongoose.connect(mongo_cs!);

    console.log("Success!");

    app.listen(port, () => {
      console.log("Listening on " + port + "...");
    });
  } catch (err) {
    console.log("Failed to start server :(");
  }
};

run();
