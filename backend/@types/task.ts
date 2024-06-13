import mongoose from 'mongoose';

// Define enum for Task status
export enum TaskStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

// Define interface for Task
export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  ticketId: mongoose.Types.ObjectId;
}
