"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    deckId: { type: mongoose_1.default.Schema.Types.ObjectId },
    tasks: { type: [String], default: ["Beginning Task."] },
    success: { type: Boolean, default: true },
    isPending: { type: Boolean, default: true },
    errorMessage: { type: String, default: null }
});
const Task = mongoose_1.default.model("tasks", TaskSchema);
exports.default = Task;
