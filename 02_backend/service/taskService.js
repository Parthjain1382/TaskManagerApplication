// services/taskService.js
import Task from "../model/task.js";

/**
 * Service class for handling Task-related database operations
 */
class TaskService {
  /**
   * Create a new task
   * @param {Object} taskData - The task data
   * @param {string} taskData.title - Task title
   * @param {string} [taskData.description] - Task description
   * @param {Array} [taskData.subtasks] - Task subtasks
   * @param {string} [taskData.status] - Task status
   * @returns {Promise<Object>} The saved task
   */
  async createTask(taskData) {
    const { title, description, subtasks, status } = taskData;
    
    if (!title || !status) {
      throw new Error("Title and status are required.");
    }

    const newTask = new Task({
      title,
      description: description || "",
      subtasks: subtasks || [],
      status,
    });
    
    return await newTask.save();
  }

  /**
   * Get all tasks grouped by status
   * @returns {Promise<Object>} Tasks grouped by status
   */
  async getAllTasksGroupedByStatus() {
    const tasks = await Task.find();
    
    // Group tasks by status
    return tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});
  }

  /**
   * Get all tasks as a flat array
   * @returns {Promise<Array>} All tasks
   */
  async getAllTasks() {
    return await Task.find();
  }

  /**
   * Update a task by ID
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object|null>} Updated task or null if not found
   */
  async updateTask(id, taskData) {
    return await Task.findByIdAndUpdate(
      id,
      taskData,
      { new: true }
    );
  }

  /**
   * Delete a task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object|null>} Deleted task or null if not found
   */
  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}

export default new TaskService();