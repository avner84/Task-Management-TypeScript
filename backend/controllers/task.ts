import { Request, Response } from 'express';
import { createNewTask, updateTask, deleteTask } from '../data-access/task';
import { ITask } from '../@types/task';

// Controller to create a new task
const createNewTaskController = async (req: Request, res: Response): Promise<void> => {
  const data: ITask = req.body;

  try {
    const result = await createNewTask(data);
    res.status(201).json({ message: `Task created!`, taskId: result._id });
  } catch (err) {
    console.log('err :', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// Controller to update a task by ID
const updateTaskController = async (req: Request, res: Response): Promise<void> => {
  const { taskId, updateData } = req.body;
  console.log('updateData :', updateData);
  console.log('taskId :', taskId);

  try {
    const updatedTask = await updateTask(taskId, updateData);
    if (updatedTask) {
      res.status(200).json({
        message: `Task with ID "${taskId}" updated successfully.`,
        task: updatedTask,
      });
    } else {
      res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }
  } catch (error) {
    console.log('err:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

// Controller to delete a task by ID
const deleteTaskController = async (req: Request, res: Response): Promise<void> => {
  const taskId = req.params.taskId;
  try {
    const wasDeleted = await deleteTask(taskId);
    if (wasDeleted) {
      res.status(200).json({ message: `Task with ID "${taskId}" deleted successfully.` });
    } else {
      res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }
  } catch (error) {
    console.log('err:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export {
  createNewTaskController,
  updateTaskController,
  deleteTaskController,
};
