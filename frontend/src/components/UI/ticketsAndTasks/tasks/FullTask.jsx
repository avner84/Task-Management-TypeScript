import React from "react";
import Card from "react-bootstrap/Card";


//Full details of a task card displayed within the task model
const FullTask = ({
  title,
  description,
  owner,
  status,
  _id
}) => {
  return (
    <Card     
      style={{ backgroundColor: "#f8f9fa" }}
      border="dark border-1"
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle className="mb-2 mt-3">Owner: {owner}</Card.Subtitle>
        <Card.Subtitle className="mb-2 mt-1">Status: {status}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default FullTask;
