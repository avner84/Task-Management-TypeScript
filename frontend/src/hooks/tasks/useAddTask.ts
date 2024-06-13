import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { addTask, resetAddTaskStatus } from '../../redux/features/tasks/tasksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { TaskFormData } from '../../@types/taskTypes';

// Custom hook for adding a task
const useAddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { addTaskStatus, addTaskError } = useTypedSelector((state) => state.tasks);

  // Function to dispatch addTask action
  const addTaskHandler = (formData: TaskFormData) => {
    dispatch(addTask(formData));
  };

  // Function to reset the add task status
  const resetStatus = () => {
    dispatch(resetAddTaskStatus());
  };

  return { addTaskStatus, addTaskError, addTask: addTaskHandler, resetStatus };
};

export default useAddTask;
