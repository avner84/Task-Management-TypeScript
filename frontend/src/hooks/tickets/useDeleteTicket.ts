import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteTicket, resetDeleteTicketStatus } from '../../redux/features/tickets/ticketsSlice';

// Custom hook for deleting a ticket
const useDeleteTicket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { deleteTicketStatus, deleteTicketError } = useTypedSelector((state) => state.tickets);

  // Function to dispatch deleteTicket action
  const deleteTicketHandler = (id: string) => {
    dispatch(deleteTicket(id));
  };

  useEffect(() => {
    // Reset the delete ticket status after a successful deletion
    if (deleteTicketStatus === 'succeeded') {
      dispatch(resetDeleteTicketStatus());
    }
  }, [deleteTicketStatus, dispatch]);

  return { deleteTicketStatus, deleteTicketError, deleteTicket: deleteTicketHandler };
};

export default useDeleteTicket;
