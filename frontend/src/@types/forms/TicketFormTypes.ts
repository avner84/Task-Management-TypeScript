import { TicketFormData } from "../ticketTypes";

export interface TicketFormProps {
    formType: string;
    initialValues: TicketFormData & { id?: string }; // Add id to initialValues
    isEditMode: boolean;
  }
