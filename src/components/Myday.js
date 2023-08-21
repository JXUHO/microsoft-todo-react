import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/TaskList";
import CompletedTaskList from "./tasks/CompletedTaskList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";

const MydayPage = () => {
  const isSidebarOpen = useSelector(state => state.ui.sidebar)
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(openSidebar())
  }


  return (
    <>
      <div>
        {!isSidebarOpen && <button onClick={openSidebarHandler}>open/close</button>}
        <h1>Myday</h1>
      </div>
      <AddTask myday={true}/>
      <TaskList/>
      <CompletedTaskList/>
    </>
  );
};

export default MydayPage;
