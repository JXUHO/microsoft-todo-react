import { useOutletContext } from "react-router-dom";
import AddTask from "./addtask/AddTask";

const Tasks = () => {
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
        <p>Taks</p>
      </div>
      <AddTask />
    </>
  );
};

export default Tasks;
