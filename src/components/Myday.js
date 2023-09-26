import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/TaskList";
import CompletedTaskList from "./tasks/CompletedTaskList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";

const Myday = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(openSidebar());
  };

  return (
    <>
      <div>
        {!isSidebarOpen && (
          <button onClick={openSidebarHandler}>open/close</button>
        )}
        <h1>Myday</h1>
      </div>
      <AddTask isMyday={true} />
      <div>
        <TaskList />
        <CompletedTaskList />
      </div>
    </>
  );
};

export default Myday;

/**
 * TODO
 * MyDayList 컴포넌트 만들기
 * CompletedTaskList를 분리하지 않음
 *
 *
 */
