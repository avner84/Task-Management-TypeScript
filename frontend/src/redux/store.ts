import { configureStore } from '@reduxjs/toolkit';
import dateSelectionReducer from './features/dateSelection/dateSelectionSlice';
import ticketsReducer from './features/tickets/ticketsSlice';
import tasksReducer from './features/tasks/tasksSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    dateSelection: dateSelectionReducer,
    tickets: ticketsReducer,
    tasks: tasksReducer,
  },
});

// Define RootState and AppDispatch types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
