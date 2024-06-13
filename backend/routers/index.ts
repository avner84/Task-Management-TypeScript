import express from 'express';
import ticketsRouter from './tickets';
import tasksRouter from './tasks';

const router = express.Router();

router.use('/tickets', ticketsRouter);
router.use('/tasks', tasksRouter);

export default router;
