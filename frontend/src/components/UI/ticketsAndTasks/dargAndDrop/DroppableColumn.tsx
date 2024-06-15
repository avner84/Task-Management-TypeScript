import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

// Define the type for the props
interface DroppableColumnProps {
  status: string;
  children: ReactNode;
  onDrop: (id: string, status: string) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ status, children, onDrop }) => {
  // Set up drop functionality using useDrop hook from react-dnd.
  const [, drop] = useDrop({
    accept: 'TASK', // Only accepts draggables of type 'TASK'.
    drop: (item: { _id: string }, monitor) => {
      // Handles drop action; triggers onDrop if item is over the column.
      if (monitor.isOver()) {
        onDrop(item._id, status);
      }
    },
  });

  // Component with drop functionality applied.
  return <div ref={drop} className={"col-4 mb-2 "}>{children}</div>;
};

export default DroppableColumn;
