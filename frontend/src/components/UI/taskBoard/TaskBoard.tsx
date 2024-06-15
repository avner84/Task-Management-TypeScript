import React from 'react';
import useFetchTickets from '../../../hooks/tickets/useFetchTickets';
import styles from './TaskBoard.module.css';
import TicketsAndTasksRow from '../ticketsAndTasks/fullRow/TicketsAndTasksRow';
import { ITicket } from '../../../@types/ticketTypes';

// The board that shows all the tickets and tasks
const TaskBoard: React.FC = () => {
  const { tickets, fetchTicketsStatus: status, fetchTicketsError: error } = useFetchTickets();

  return (
    <div className={`container ${styles.taskBoardContainer}`}>
      {/* The titles of the board */}
      <div className={`row ${styles.taskBoardTitles}`}>
        <div className="col-4"></div>
        <div className="col-8">
          <div className="row">
            <div className="col-4">New</div>
            <div className="col-4">In progress</div>
            <div className="col-4">Done</div>
          </div>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="container pt-5">
          <h4 className="text-center text-secondary mt-3">Loading...</h4>
        </div>
      ) : error ? (
        <div className="container pt-5">
          <h4 className="text-center text-danger mt-3">{error}</h4>
        </div>
      ) : tickets.length > 0 ? (
        tickets.map((ticket: ITicket) => (
          <TicketsAndTasksRow
            key={ticket._id}
            _id={ticket._id}
            title={ticket.title}
            description={ticket.description}
            owner={ticket.owner}
            dueDate={ticket.dueDate}
            status={ticket.status}
            priority={ticket.priority}
            type={ticket.type}
            tasks={ticket.tasks}
          />
        ))
      ) : (
        <div className="container pt-5">
          <h4 className="text-center text-secondary mt-3">
            No tickets or bugs found for the selected date.
          </h4>
        </div>
      )}
    </div>
  );
}

export default TaskBoard;
