import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/vars';

// Asynchronous function to connect to the MongoDB database
async function connectToDatabase(): Promise<void> {
  try {
    // Attempting to connect to MongoDB using the connection string (URI)
    await mongoose.connect(MONGODB_URI, {
      writeConcern: {
        w: "majority", // Requests acknowledgment that the write operation has propagated to the majority of nodes
        j: true // Requests acknowledgment that the write operation has been written to the journal
      }
    });
    console.log("Connected to MongoDB successfully!"); // Log success message
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Log any errors
    process.exit(1); // Exit the process with failure code
  }
}

export default connectToDatabase;
