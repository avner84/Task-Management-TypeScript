import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../../redux/features/dateSelection/dateSelectionSlice";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./DateSelection.module.css";

interface DateSelectionState {
  dateSelection: {
    startDate: string;
    endDate: string;
  };
}

// DateSelection component is used to set the date range for displaying tickets in the application
const DateSelection: FC = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state: DateSelectionState) => state.dateSelection);

  // Handle setting the start date
  const handleSetStartDate = (date: Date) => {
    dispatch(setStartDate(date.toISOString().substring(0, 10)));
  };

  // Handle setting the end date
  const handleSetEndDate = (date: Date) => {
    dispatch(setEndDate(date.toISOString().substring(0, 10)));
  };

  return (
    <div className="d-flex justify-content-start gap-2 me-2">
      <p>Dates:</p>
      <DatePicker
        selected={new Date(startDate)}
        onChange={handleSetStartDate}
        dateFormat="dd/MM/yyyy"
        className={`form-control ${styles.datePicker}`}
      />
      <span>-</span>
      <DatePicker
        selected={new Date(endDate)}
        onChange={handleSetEndDate}
        dateFormat="dd/MM/yyyy"
        className={`form-control ${styles.datePicker}`}
      />
    </div>
  );
}

export default DateSelection;