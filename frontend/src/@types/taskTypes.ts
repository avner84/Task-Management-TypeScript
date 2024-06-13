export enum TaskStatus {
    NEW = 'new',
    IN_PROGRESS = 'in progress',
    DONE = 'done'
  }
  
  export interface TaskInterface {
    _id: string;
    title: string;
    description: string;
    owner: string;
    status: TaskStatus;
    ticketId: string;
  }
  
  export interface TaskFormData {
    title: string;
    description: string;
    owner: string;
    status: TaskStatus;
    ticketId: string;
  }
  
  export interface UpdateTaskData {
    taskId: string;
    updateData: Partial<TaskInterface>;
  }
  
  export interface TasksState {
    addTaskStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    updateTaskStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    deleteTaskStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    addTaskError: string | null;
    updateTaskError: string | null;
    deleteTaskError: string | null;
  }
  