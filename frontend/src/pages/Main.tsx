import React from "react";
import TopBar from "../components/UI/topBar/TopBar";
import TaskBoard from "../components/UI/taskBoard/TaskBoard";

const Main: React.FC = () => {
  return (
    <div className="container">
      <header className="text-center mt-4 mb-5">
        <h1>Task Management</h1>
      </header>
      <TopBar /> {/* TopBar contains the date picker and the button for adding a ticket or bug */}
      <TaskBoard /> {/* TaskBoard contains all the tickets and tasks */}
    </div>
  );
};

export default Main;
