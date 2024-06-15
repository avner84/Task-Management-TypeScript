import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomModal from "../modal/CustomModal";
import TicketForm from "../forms/TicketForm";
import useAddTicket from "../../../hooks/tickets/useAddTicket";
import { TicketFormData, TicketType, TicketStatus, TicketPriority } from "../../../@types/ticketTypes";

// Add ticket or bug button
const NewTicketButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<TicketType>(TicketType.TICKET);
  const { resetStatus } = useAddTicket();

  // Handle closing the modal
  const handleClose = () => {
    resetStatus();
    setShowModal(false);
  };

  // Handle showing the modal with the specified form type
  const handleShow = (type: TicketType) => {
    setFormType(type);
    setShowModal(true);
  };

  // Initial values for the form
  const initialValues: TicketFormData = {
    title: "",
    description: "",
    owner: "",
    dueDate: "",
    status: TicketStatus.NEW,
    priority: TicketPriority.MEDIUM,
    type: formType,
  };

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Add a new">
        <Dropdown.Item
          className="text-primary"
          onClick={() => handleShow(TicketType.TICKET)}
        >
          Ticket
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          className="text-danger"
          onClick={() => handleShow(TicketType.BUG)}
        >
          Bug
        </Dropdown.Item>
      </DropdownButton>

      <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={`Create a new ${formType}`}
      >
        <TicketForm formType={formType} initialValues={initialValues} isEditMode={false} />
      </CustomModal>
    </>
  );
};

export default NewTicketButton;
