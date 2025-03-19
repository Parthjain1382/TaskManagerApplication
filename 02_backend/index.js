import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  { json } from "express";
import Task from "./model/task.js";
import tasksRouter from "./router/taskRoute.js";
import { connectDatabase } from "./database.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// Connect to MongoDB and start server if successful, otherwise log error
connectDatabase().then(() => {
  // Routes
  app.use('/tasks', tasksRouter);

  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`Server is running. Listening on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error connecting to database:", error);
  process.exit(1); // Exit the process with error status code
});