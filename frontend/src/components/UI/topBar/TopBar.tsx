import React from "react";
import DateSelection from "./DateSelection";
import NewTicketButton from "./NewTicketButton";

const TopBar: React.FC = () => {
  return (
    <div className="container d-flex content-start gap-5">
      <DateSelection />
      <NewTicketButton />
    </div>
  );
};

export default TopBar;
