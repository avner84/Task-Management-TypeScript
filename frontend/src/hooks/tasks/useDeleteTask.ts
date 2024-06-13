import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect } from 'react';
import { deleteTask, resetDeleteTaskStatus } from '../../redux/features/tasks/tasksSlice';
import { AppDispatch, RootState } from '../../redux/store';

// Custom hook for deleting a task
const useDeleteTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { deleteTaskStatus, deleteTaskError } = useTypedSelector((state) => state.tasks);

  // Function to dispatch deleteTask action
  const deleteTaskHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    // Reset the delete task status after a successful deletion
    if (deleteTaskStatus === 'succeeded') {
      dispatch(resetDeleteTaskStatus());
    }
  }, [deleteTaskStatus, dispatch]);

  // Function to reset the delete task status and error
  const resetStatus = () => {
    if (deleteTaskError !== null) {
      dispatch(resetDeleteTaskStatus());
    }
  };

  return { deleteTaskStatus, deleteTaskError, deleteTask: deleteTaskHandler, resetStatus };
};

export default useDeleteTask;
