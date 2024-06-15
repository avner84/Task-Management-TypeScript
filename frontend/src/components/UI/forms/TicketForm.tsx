import React, { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAddTicket from "../../../hooks/tickets/useAddTicket";
import useUpdateTicket from "../../../hooks/tickets/useUpdateTicket";
import BeatLoader from "react-spinners/BeatLoader";
import { TicketFormData, TicketStatus, TicketPriority, TicketType } from "../../../@types/ticketTypes";
import { TicketFormProps } from "../../../@types/forms/TicketFormTypes";

const TicketForm: React.FC<TicketFormProps> = ({ formType, initialValues, isEditMode }) => {
  const { addTicketStatus, addTicketError, addTicket } = useAddTicket();
  const { updateTicketStatus, updateTicketError, updateTicket } = useUpdateTicket();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const formik = useFormik<TicketFormData>({
    initialValues: initialValues || {
      title: "",
      description: "",
      owner: "",
      dueDate: "",
      status: TicketStatus.NEW,
      priority: TicketPriority.MEDIUM,
      type: formType as TicketType,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      owner: Yup.string().required("Required"),
      dueDate: Yup.date().required("Required"),
      status: Yup.string().required("Required"),
      priority: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
    onSubmit: async (values: TicketFormData, { resetForm }: FormikHelpers<TicketFormData>) => {
      if (isEditMode && initialValues && initialValues._id) {
        await updateTicket(initialValues._id, values);
      } else {
        await addTicket(values);
        resetForm();
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (addTicketStatus === "succeeded" || updateTicketStatus === "succeeded") {
      setShowSuccessMessage(true);
    }
  }, [addTicketStatus, updateTicketStatus]);

  useEffect(() => {
    const hasChanged = Object.keys(formik.initialValues).some(
      (key) => formik.initialValues[key as keyof TicketFormData] !== formik.values[key as keyof TicketFormData]
    );
    setIsChanged(hasChanged);
  }, [formik.values, formik.initialValues]);

  const error = isEditMode ? updateTicketError : addTicketError;
  const isLoading = addTicketStatus === "loading" || updateTicketStatus === "loading";

  return (
    <>
      {showSuccessMessage ? (
        <div className="container py-4">
          <h5 className="text-center">
            {isEditMode ? "Successfully updated" : "Successfully added"} {formType}
          </h5>
        </div>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          {error && (
            <div className="container pb-3 text-danger">
              <h6>{error}</h6>
            </div>
          )}
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              isInvalid={formik.touched.title && !!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              isInvalid={formik.touched.description && !!formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOwner">
            <Form.Control
              required
              type="text"
              placeholder="Owner's Name"
              name="owner"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.owner}
              isInvalid={formik.touched.owner && !!formik.errors.owner}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.owner}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDueDate">
            <label htmlFor="dueDate" className="text-muted mb-2 ms-2">
              Due Date:
            </label>
            <Form.Control
              required
              type="date"
              name="dueDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dueDate}
              isInvalid={formik.touched.dueDate && !!formik.errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dueDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Select
              required
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              isInvalid={formik.touched.status && !!formik.errors.status}
            >
              <option value="">Choose Status...</option>
              <option value={TicketStatus.NEW}>New</option>
              <option value={TicketStatus.APPROVED}>Approved</option>
              <option value={TicketStatus.COMMITTED}>Committed</option>
              <option value={TicketStatus.DONE}>Done</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPriority">
            <Form.Select
              required
              name="priority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
              isInvalid={formik.touched.priority && !!formik.errors.priority}
            >
              <option value="">Select Priority</option>
              <option value={TicketPriority.HIGH}>High</option>
              <option value={TicketPriority.MEDIUM}>Medium</option>
              <option value={TicketPriority.LOW}>Low</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.priority}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant={formType.toLowerCase() === "ticket" ? "primary" : "danger"}
            type="submit"
            disabled={isLoading || (isEditMode && !isChanged)}
          >
            {isLoading ? (
              <BeatLoader
                color="white"
                loading={true}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              isEditMode ? `Update ${formType.charAt(0).toUpperCase() + formType.slice(1)}` : `Add ${formType.charAt(0).toUpperCase() + formType.slice(1)}`
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default TicketForm;
