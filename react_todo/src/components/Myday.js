// import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/TaskList";
import CompletedTaskList from "./tasks/CompletedTaskList";

const MydayPage = () => {
  const [collapse, setCollapse] = useOutletContext();


  return (
    <>
      <div>
        {!collapse.sidebar && (
          <button
            onClick={() => {
              setCollapse((prevState) => ({...prevState, sidebar: !prevState.sidebar}));
            }}
          >
            open/close
          </button>
        )}
        <h1>Myday</h1>
      </div>
      <AddTask myday={true}/>
      <TaskList/>
      <CompletedTaskList/>
    </>
  );
};

export default MydayPage;
