import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  subtasks: { type: [String], default: [] },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo",required: true },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;