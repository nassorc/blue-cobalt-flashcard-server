import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId },
  tasks: { type: [String], default: ["Beginning Task."] },
  success: { type: Boolean, default: true },
  isPending: { type: Boolean, default: true },
  errorMessage: { type: String, default: null }
});

const Task = mongoose.model("tasks", TaskSchema);

export default Task;
