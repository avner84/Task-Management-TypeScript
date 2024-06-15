export enum TaskStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  DONE = 'done'
}

export enum TicketStatus {
  NEW = 'new',
  APPROVED = 'approved',
  COMMITTED = 'committed',
  DONE = 'done'
}

export enum TicketPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}


export enum TicketType {
  TICKET = 'ticket',
  BUG = 'bug'
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  ticketId: string;
}

export interface ITicket {
  _id: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  tasks: ITask[];
}

export interface TicketFormData {
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
}

export interface TaskFormData {
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  ticketId: string;
}

export interface UpdateTicketData {
  id: string;
  updateData: Partial<ITicket>;
}

export interface TicketsState {
  tickets: ITicket[];
  fetchTicketsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  addTicketStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  updateTicketStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteTicketStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchTicketsError: string | null;
  addTicketError: string | null;
  updateTicketError: string | null;
  deleteTicketError: string | null;
}
