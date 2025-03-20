// routes/tasksRouter.js
import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask } from "../controller/taskController.js";

const tasksRouter = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 */
tasksRouter.post("/", createTask);

/**
 * @route   GET /api/tasks
 * @desc    Retrieve all tasks
 */
tasksRouter.get("/", getAllTasks);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task by ID
 */
tasksRouter.put("/:id", updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task by ID
 */
tasksRouter.delete("/:id", deleteTask);

export default tasksRouter;