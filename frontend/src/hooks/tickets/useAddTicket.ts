import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addTicket, resetAddTicketStatus } from '../../redux/features/tickets/ticketsSlice';
import { TicketFormData, TicketStatus, TicketPriority, TicketType } from '../../@types/ticketTypes';


// Define the form data type
interface FormData {
    title: string;
    description: string;
    owner: string;
    dueDate: string;
    priority: TicketPriority; // Change to TicketPriority
    // Add any other fields your form may have
  }
  
  // Custom hook for adding a ticket
  const useAddTicket = (formType: TicketType) => {
    const dispatch = useDispatch<AppDispatch>();
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const { addTicketStatus, addTicketError } = useTypedSelector((state) => state.tickets);
  
    // Function to dispatch addTicket action with form data and type
    const addTicketHandler = (formData: FormData) => {
      const dataToSend: TicketFormData = { ...formData, type: formType, status: TicketStatus.NEW };
      dispatch(addTicket(dataToSend));
    };
  
    // Function to reset the add ticket status
    const resetStatus = () => {
      dispatch(resetAddTicketStatus());
    };
  
    return { addTicketStatus, addTicketError, addTicket: addTicketHandler, resetStatus };
  };
  
  export default useAddTicket;