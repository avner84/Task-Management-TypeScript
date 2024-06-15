import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addTicket, resetAddTicketStatus } from '../../redux/features/tickets/ticketsSlice';
import { TicketFormData } from '../../@types/ticketTypes';

const useAddTicket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { addTicketStatus, addTicketError } = useTypedSelector((state) => state.tickets);

  const addTicketHandler = (formData: TicketFormData) => {
    dispatch(addTicket(formData));
  };

  const resetStatus = () => {
    dispatch(resetAddTicketStatus());
  };

  return { addTicketStatus, addTicketError, addTicket: addTicketHandler, resetStatus };
};

export default useAddTicket;
