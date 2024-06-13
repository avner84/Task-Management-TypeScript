import mongoose from 'mongoose';

// Define enums for Ticket
export enum TicketStatus {
  NEW = 'new',
  APPROVED = 'approved',
  COMMITTED = 'committed',
  DONE = 'done',
}

export enum TicketPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum TicketType {
  TICKET = 'ticket',
  BUG = 'bug',
}

// Define interface for Ticket
export interface ITicket extends mongoose.Document {
  title: string;
  description: string;
  owner: string;
  dueDate: Date;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
}
