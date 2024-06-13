import { Router } from 'express';
import {
  createNewTaskController,
  updateTaskController,
  deleteTaskController
} from '../controllers/task';

const router = Router();

router.post('/create-task', createNewTaskController);
router.put('/update-task', updateTaskController);
router.delete('/delete-task/:taskId', deleteTaskController);

export default router;
