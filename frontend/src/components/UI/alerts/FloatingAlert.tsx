import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from './FloatingAlert.module.css';
import { FloatingAlertProps } from '../../../@types/FloatingAlertTypes';

// FloatingAlert component to display floating alert messages
const FloatingAlert: React.FC<FloatingAlertProps> = ({ message, duration = 3000 }) => {
  const [show, setShow] = useState(true);

  // Hide the alert after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {show && (
        <Alert variant="danger" className={styles.FloatingAlert}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default FloatingAlert;
