import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { updateTicket, resetUpdateTicketStatus } from '../../redux/features/tickets/ticketsSlice';
import { UpdateTicketData } from '../../@types/ticketTypes';

// Custom hook for updating a ticket
const useUpdateTicket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { updateTicketStatus, updateTicketError } = useTypedSelector((state) => state.tickets);

  // Function to dispatch updateTicket action
  const updateTicketHandler = (id: string, updateData: Partial<UpdateTicketData['updateData']>) => {
    dispatch(updateTicket({ id, updateData }));
  };

  // Reset the update ticket status after a successful update
  useEffect(() => {
    if (updateTicketStatus === 'succeeded') {
      dispatch(resetUpdateTicketStatus());
    }
  }, [updateTicketStatus, dispatch]);

  // Function to reset the update ticket status
  const resetStatus = () => {
    dispatch(resetUpdateTicketStatus());
  };

  return { updateTicketStatus, updateTicketError, updateTicket: updateTicketHandler, resetStatus };
};

export default useUpdateTicket;
