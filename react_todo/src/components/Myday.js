// import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddTask from "./addtask/AddTask";
import Todos from "./Todos";

const MydayPage = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return (
    <>
      <div>
        {!collapseSidebar && (
          <button
            onClick={() => {
              setCollapseSidebar((prevState) => !prevState);
            }}
          >
            open/close
          </button>
        )}
        <p>Myday</p>
      </div>
      <AddTask/>
      <Todos/>
    </>
  );
};

export default MydayPage;
