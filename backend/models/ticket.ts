import mongoose, { Schema, Model } from 'mongoose';
import { ITicket, TicketStatus, TicketPriority, TicketType } from '../@types/ticket';

// Define Ticket schema
const ticketSchema: Schema<ITicket> = new Schema(
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
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TicketStatus), // Use the enum for status
    },
    priority: {
      type: String,
      required: true,
      enum: Object.values(TicketPriority), // Use the enum for priority
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(TicketType), // Use the enum for type
    },
  },
  { timestamps: true }
);

// Create Ticket model
const TicketModel: Model<ITicket> = mongoose.model<ITicket>('Ticket', ticketSchema);

export default TicketModel;
