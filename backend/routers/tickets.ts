import { Router } from 'express';
import {
  createNewTicketController,
  findTicketsByDateController,
  updateTicketController,
  deleteTicketController
} from '../controllers/tickets';

const router = Router();

router.post('/create-ticket', createNewTicketController);
router.post('/get-tickets', findTicketsByDateController);
router.put('/update-ticket', updateTicketController);
router.delete('/delete-ticket/:ticketId', deleteTicketController);

export default router;
