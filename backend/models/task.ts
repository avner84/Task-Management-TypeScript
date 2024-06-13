import mongoose, { Schema, Model } from 'mongoose';
import { ITask, TaskStatus } from '../@types/task';

// Define Task schema
const taskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus), // Use the enum for status
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
  },
  { timestamps: true }
);

// Create Task model
const TaskModel: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default TaskModel;
