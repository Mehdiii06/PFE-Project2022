import React, { useState, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Lists from "./Lists";
import Header from "./Header";

import "./Tasks.scss";

const Tasks = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="grid-containerrr">
          
          <Lists />
        </div>
      </DndProvider>
    </>
  );
};

export default Tasks;
