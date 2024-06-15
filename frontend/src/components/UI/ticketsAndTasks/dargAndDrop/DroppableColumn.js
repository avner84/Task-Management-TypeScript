import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableColumn = ({ status, children, onDrop }) => {
  // Set up drop functionality using useDrop hook from react-dnd.
  const [, drop] = useDrop({
    accept: 'TASK', // Only accepts draggables of type 'TASK'.
    drop: (item, monitor) => {
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
