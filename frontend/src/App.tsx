import React from "react";
import Main from "./pages/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* DndProvider provides the drag-and-drop context using HTML5Backend for handling the DnD events */}
      <Main />
    </DndProvider>
  );
}

export default App;
