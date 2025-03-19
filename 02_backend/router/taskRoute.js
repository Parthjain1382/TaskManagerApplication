import express from "express";
import Task from "../model/task.js"; // Import the Task model

const tasksRouter = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 */
tasksRouter.post("/", async (req, res) => {
  try {
    const { title, description, subtasks,status } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = new Task({
      title,
      description: description || "",
      subtasks: subtasks || [],
      status: status || "To Do",
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

/**
 * @route   GET /api/tasks
 * @desc    Retrieve all tasks
 */
tasksRouter.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks

    // Group tasks by status
    const groupedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});

    res.json(groupedTasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});


/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task by ID
 */
tasksRouter.put("/:id", async (req, res) => {
  try {
    const { title, description, subtasks, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, subtasks, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task by ID
 */
tasksRouter.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default tasksRouter;
