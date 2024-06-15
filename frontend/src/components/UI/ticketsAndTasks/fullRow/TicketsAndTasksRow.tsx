import React, { useState } from "react";
import TicketOrBugCard from "../tickets/TicketOrBug";
import MiniTask from "../tasks/MiniTask";
import styles from "./TicketsAndTasksRow.module.css";
import DroppableColumn from "../dargAndDrop/DroppableColumn";
import useUpdateTask from "../../../../hooks/tasks/useUpdateTask";
import FloatingAlert from "../../alerts/FloatingAlert";
import { ITicket, ITask, TaskStatus } from "../../../../@types/ticketTypes";

interface TicketsAndTasksRowProps extends ITicket {
  tasks: ITask[];
}

const TicketsAndTasksRow: React.FC<TicketsAndTasksRowProps> = ({
  _id,
  title,
  description,
  owner,
  dueDate,
  status,
  priority,
  type,
  tasks = [], // Ensure tasks is initialized as an empty array if not provided
}) => {
  const { updateTask, updateTaskError } = useUpdateTask();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for drop action in DroppableColumn
  const handleDrop = async (taskId: string, columnStatus: string) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== columnStatus) {
      await updateTask(taskId, { status: columnStatus as TaskStatus });
    }
  };

  // Filtering tasks based on their status to organize them in different columns
  const newTasksArray = tasks.filter(
    (task) => task.ticketId === _id && task.status === TaskStatus.NEW
  );
  const inProgressArray = tasks.filter(
    (task) => task.ticketId === _id && task.status === TaskStatus.IN_PROGRESS
  );
  const doneTasksArray = tasks.filter(
    (task) => task.ticketId === _id && task.status === TaskStatus.DONE
  );

  return (
    <>
      {updateTaskError && !isModalOpen && (
        <FloatingAlert message={updateTaskError} duration={3000} />
      )}
      <div className={`row py-3 ${styles.fullRowContainer}`}>
        <div className="col-4">
          <TicketOrBugCard
            id={_id}
            title={title}
            description={description}
            owner={owner}
            dueDate={dueDate}
            status={status}
            priority={priority}
            type={type}
          />
        </div>

        <div className="col-8">
          {newTasksArray.length > 0 ||
          inProgressArray.length > 0 ||
          doneTasksArray.length > 0 ? (
            <div className="row">
              <DroppableColumn status="new" onDrop={handleDrop}>
                {newTasksArray.map((task) => (
                  <MiniTask key={task._id} {...task} setIsModalOpen={setIsModalOpen} />
                ))}
              </DroppableColumn>
              <DroppableColumn status="in progress" onDrop={handleDrop}>
                {inProgressArray.map((task) => (
                  <MiniTask key={task._id} {...task} setIsModalOpen={setIsModalOpen} />
                ))}
              </DroppableColumn>
              <DroppableColumn status="done" onDrop={handleDrop}>
                {doneTasksArray.map((task) => (
                  <MiniTask key={task._id} {...task} setIsModalOpen={setIsModalOpen} />
                ))}
              </DroppableColumn>
            </div>
          ) : (
            <div className={styles.containerNoTasks}>
              <p className={styles.noTasks}>Tasks have not been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketsAndTasksRow;
