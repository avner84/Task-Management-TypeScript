import React, { useState, useEffect } from "react";
import styles from "./MiniTask.module.css";
import Card from "react-bootstrap/Card";
import CustomModal from "../../modal/CustomModal";
import FullTask from "./FullTask";
import TaskForm from "../../forms/TaskForm"; // Import the TaskForm component
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import useDeleteTask from "../../../../hooks/tasks/useDeleteTask";
import useUpdateTask from "../../../../hooks/tasks/useUpdateTask";
import FloatingAlert from "../../alerts/FloatingAlert";
import { useDrag } from "react-dnd";

// MiniTask is a small card displaying basic information about a task in a table.
// When clicked, it shows the full task information, allowing the user to edit or delete the task.
export default function MiniTask({
  _id,
  ticketId,
  title,
  description,
  owner,
  status,
  setIsModalOpen,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if we're in edit mode
  const {
    deleteTask,
    deleteTaskError,
    resetStatus: resetDeleteTaskStatus,
  } = useDeleteTask();
  const { resetStatus: resetUpdateTaskStatus } = useUpdateTask();

  // Handle delete button click
  const handleDeleteClick = () => setIsDeleting(true);

  // Handle cancel delete action
  const handleCancelDelete = () => {
    setIsDeleting(false);
    resetDeleteTaskStatus();
  };

  // Handle modal close action
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false); // Reset edit mode when closing the modal
    handleCancelDelete();
    resetDeleteTaskStatus();
    resetUpdateTaskStatus();
  };

  // Handle modal open action
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle delete task action
  const handleDeleteTask = () => {
    deleteTask(_id);
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true); // Set edit mode
    resetUpdateTaskStatus(); // If there are errors from updating the task status via drag-and-drop, they will be reset when the modal is opened in edit mode
  };

  // Handle back button click in edit mode
  const handleBackClick = () => {
    setIsEditing(false); // Exit edit mode
  };

  // Setup drag behavior for the task
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { _id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const initialValues = {
    title,
    description,
    owner,
    status,
    ticketId,
    _id,
  };

  // Update modal open state when showModal changes
  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal, setIsModalOpen]);

  // Render footer buttons based on the current state (editing, deleting, or viewing)
  const renderFooter = () => {
    if (isDeleting) {
      return null;
    } else if (isEditing) {
      return (
        <div>
          <Button variant="secondary" onClick={handleBackClick}>
            Back
          </Button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-between w-100">
          <Button variant="secondary" onClick={handleEditClick}>
            Edit
          </Button>
          <div
            className={`mt-1 ${styles.trashIcon}`}
            onClick={handleDeleteClick}
          >
            <Trash role="button" size={25} />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {deleteTaskError && (
        <FloatingAlert message={deleteTaskError} duration="3000" />
      )}
      <Card
        ref={drag}
        className="mb-2"
        style={{
          backgroundColor: "#f8f9fa",
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? "grabbing" : "pointer",
        }}
        border="dark border-1"
        onClick={handleOpenModal}
        role="button"
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 mt-3 text-muted">
            Owner: {owner}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title={isEditing ? "Edit Task" : "Task Details"}
        footer={renderFooter()}
      >
        {isDeleting ? (
          <div>
            <div className="container py-3 text-center">
              <h5>Are you sure you want to delete this task?</h5>
            </div>
            <div className="mt-3 d-flex justify-content-center gap-4 pb-5">
              <Button variant="danger" onClick={handleDeleteTask}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleCancelDelete}>
                No
              </Button>
            </div>
          </div>
        ) : isEditing ? (
          <TaskForm initialValues={initialValues} isEditMode={true} />
        ) : (
          <FullTask
            title={title}
            description={description}
            owner={owner}
            status={status}
            _id={_id}
          />
        )}
      </CustomModal>
    </>
  );
}
