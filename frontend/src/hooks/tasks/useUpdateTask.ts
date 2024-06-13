import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect } from 'react';
import { updateTask, resetUpdateTaskStatus } from '../../redux/features/tasks/tasksSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { UpdateTaskData } from '../../@types/taskTypes';

// Custom hook for updating a task
const useUpdateTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { updateTaskStatus, updateTaskError } = useTypedSelector((state) => state.tasks);

  // Function to dispatch updateTask action
  const updateTaskHandler = (taskId: string, updateData: Partial<UpdateTaskData['updateData']>) => {
    dispatch(updateTask({ taskId, updateData }));
  };

  useEffect(() => {
    // Reset the update task status after a successful update
    if (updateTaskStatus === 'succeeded') {
      dispatch(resetUpdateTaskStatus());
    }
  }, [updateTaskStatus, dispatch]);

  // Function to reset the update task status and error
  const resetStatus = () => {
    if (updateTaskError !== null) {
      dispatch(resetUpdateTaskStatus());
    }
  };

  return { updateTaskStatus, updateTaskError, updateTask: updateTaskHandler, resetStatus };
};

export default useUpdateTask;
