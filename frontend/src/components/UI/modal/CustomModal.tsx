import React from "react";
import Modal from "react-bootstrap/Modal";
import { CustomModalProps } from "../../../@types/modal/CustomModalTypes";

const CustomModal: React.FC<CustomModalProps> = ({ show, handleClose, title, children, footer }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer className="d-flex justify-content-between">
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
