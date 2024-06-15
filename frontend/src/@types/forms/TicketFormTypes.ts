import { TicketFormData, TicketType } from "../../@types/ticketTypes";

export interface TicketFormProps {
  formType: TicketType;
  initialValues?: TicketFormData & { _id?: string };
  isEditMode: boolean;
}
