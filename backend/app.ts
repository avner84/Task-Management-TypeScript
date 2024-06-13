import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routers/index';
import connectToDatabase from './utils/connectToDatabase';
import { port as PORT } from './config/default';

const app = express();

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  console.log(`Received ${method} request to ${url}`);
  next();
});

app.use(express.json());

// Configure CORS with an options object
app.use(
  cors({
    origin: "*", // Allows requests only from the origin defined in the configuration file
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specifies the allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specifies the allowed headers
    credentials: true, // Allows the use of credentials like cookies
  })
);

app.use(routes);

// Error Handling Middleware: Handles any errors that occur in the application
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const { statusCode = 500, message, data } = error;
  res.status(statusCode).json({ message, data });
});

app.listen(PORT || 8080, async () => {
  await connectToDatabase(); // Attempt to connect to the database
  console.log(`Server is running on port ${PORT || 8080}`);
});
