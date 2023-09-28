import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/MydayList";
import CompletedTaskList from "./tasks/CompletedTaskList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";

const Important = () => {
  const isSidebarOpen = useSelector(state => state.ui.sidebar)
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(openSidebar())
  }


  return (
    <>
      <div>
        {!isSidebarOpen && <button onClick={openSidebarHandler}>open/close</button>}
        <h1>Important</h1>
      </div>
      <AddTask myday={false}/>
      {/* <TaskList/> */}
      <CompletedTaskList/>
    </>
  );
};

export default Important;
