import mongoose from 'mongoose';
import Ticket from '../models/ticket';
import Task from '../models/task';
import { ITicket } from '../@types/ticket';
import { ITask } from '../@types/task';

// Define the type for the date range
interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Function to create a new ticket with the provided data
const createNewTicket = async (ticketData: ITicket): Promise<ITicket> => {
  try {
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
    console.log(`Ticket "${ticketData.title}" created successfully`);
    return newTicket;
  } catch (error) {
    throw error;
  }
};

// Function to find tickets by a specific date
const findTicketsByDate = async (dateData: DateRange): Promise<ITicket[]> => {
  const { startDate, endDate } = dateData;
  try {
    const endDateWithTime = new Date(endDate);
    endDateWithTime.setHours(23, 59, 59, 999); // Sets the time to the end of the day

    const tickets = await Ticket.aggregate([
      {
        $match: {
          dueDate: {
            $gte: new Date(startDate),
            $lte: endDateWithTime,
          },
        },
      },
      {
        $sort: { dueDate: 1 }, // Sorting by dueDate in ascending order
      },
      {
        $lookup: {
          from: "tasks", // The collection name in MongoDB for tasks
          localField: "_id", // Field in tickets collection to join on
          foreignField: "ticketId", // Field in tasks collection to join on
          as: "tasks", // Output array field with joined documents
        },
      },
      {
        $addFields: {
          tasks: { $ifNull: ["$tasks", []] } // Replace null tasks with an empty array if there are no tasks for the ticket
        }
      }
    ]);

    return tickets as ITicket[];
  } catch (error) {
    throw error;
  }
};

// Function to update a ticket by ID
const updateTicket = async (ticketId: string, updateData: Partial<ITicket>): Promise<ITicket | null> => {
  try {
    // Update the ticket
    await Ticket.findByIdAndUpdate(ticketId, updateData, { new: true });

     // Fetch the updated ticket along with its tasks
    const updatedTicket = await Ticket.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(ticketId) } }, 
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "ticketId",
          as: "tasks"
        }
      },
      {
        $addFields: {
          tasks: { $ifNull: ["$tasks", []] }
        }
      }
    ]);

    if (!updatedTicket || updatedTicket.length === 0) {
      throw new Error(`Ticket with ID ${ticketId} not found.`);
    }

    console.log(`Ticket with ID "${ticketId}" has been updated successfully.`);
    return updatedTicket[0] as ITicket; // Since the returned ticket is inside an array, access the first element
  } catch (error) {
    throw error;
  }
};

// Function to delete a ticket and all associated tasks
const deleteTicket = async (ticketId: string): Promise<boolean> => {
  try {
      // Delete all tasks associated with this ticket
    const deleteTasks = await Task.deleteMany({ ticketId: ticketId });
    console.log(`Deleted ${deleteTasks.deletedCount} tasks associated with ticket ID "${ticketId}".`);

     // Delete the ticket
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      console.log(`Ticket with ID ${ticketId} not found.`);
      return false;
    }
    console.log(`Ticket with ID "${ticketId}" has been deleted successfully.`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { createNewTicket, findTicketsByDate, updateTicket, deleteTicket };
