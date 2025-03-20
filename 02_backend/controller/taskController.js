// controllers/taskController.js
import taskService from "../service/taskService.js";


// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, subtasks, status } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const savedTask = await taskService.createTask({
      title,
      description,
      subtasks,
      status
    });
    
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// Get all tasks grouped by status
export const getAllTasks = async (req, res) => {
  try {
    const groupedTasks = await taskService.getAllTasksGroupedByStatus();
    res.json(groupedTasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { title, description, subtasks, status } = req.body;
    const updatedTask = await taskService.updateTask(
      req.params.id,
      { title, description, subtasks, status }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};