import React, { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useAddTask from "../../../hooks/tasks/useAddTask";
import useUpdateTask from "../../../hooks/tasks/useUpdateTask";
import BeatLoader from "react-spinners/BeatLoader";
import { TaskFormData, TaskStatus } from "../../../@types/taskTypes";
import { TaskFormProps } from "../../../@types/forms/TaskFormTypes";

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, isEditMode }) => {
  const { addTaskStatus, addTaskError, addTask } = useAddTask();
  const { updateTaskStatus, updateTaskError, updateTask } = useUpdateTask();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Initialize formik with initialValues, validation schema, and onSubmit handler
  const formik = useFormik<TaskFormData>({
    initialValues: initialValues || {
      title: "",
      description: "",
      owner: "",
      status: TaskStatus.NEW,
      ticketId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      owner: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: async (values: TaskFormData, { resetForm }: FormikHelpers<TaskFormData>) => {
      if (isEditMode) {
        const { _id: taskId, ...updateData } = values as any;
        await updateTask(taskId, updateData);
      } else {
        await addTask(values);
        resetForm();
      }
    },
    enableReinitialize: true,
  });

  // Show success message on successful add or update
  useEffect(() => {
    if (addTaskStatus === "succeeded" || updateTaskStatus === "succeeded") {
      setShowSuccessMessage(true);
    }
  }, [addTaskStatus, updateTaskStatus]);

  // Track if form values have changed
  useEffect(() => {
    const hasChanged = Object.keys(formik.initialValues).some(
      (key) => formik.initialValues[key as keyof TaskFormData] !== formik.values[key as keyof TaskFormData]
    );
    setIsChanged(hasChanged);
  }, [formik.values, formik.initialValues]);

  const error = isEditMode ? updateTaskError : addTaskError;
  const isLoading = addTaskStatus === "loading" || updateTaskStatus === "loading";

  return (
    <>
      {showSuccessMessage ? (
        <div className="container py-4">
          <h5 className="text-center">
            {isEditMode ? "Successfully updated" : "Successfully added"} Task
          </h5>
        </div>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          {error && (
            <div className="container pb-3 text-danger">
              <h6>{error}</h6>
            </div>
          )}

          {/* Title */}
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
          {/* Description */}
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
          {/* Owner */}
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
          {/* Status */}
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
              <option value={TaskStatus.NEW}>New</option>
              <option value={TaskStatus.IN_PROGRESS}>In progress</option>
              <option value={TaskStatus.DONE}>Done</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Submit Button */}
          <Button
            variant="primary"
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
              isEditMode ? "Update Task" : "Add Task"
            )}
          </Button>
        </Form>
      )}
    </>
  );
};

export default TaskForm;
