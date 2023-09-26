import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";
import { RxHamburgerMenu } from "react-icons/rx";

const Myday = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(openSidebar());
  };

  return (
    <div>
      <div> {/**task toolbar*/}
        {!isSidebarOpen && (
          <button onClick={openSidebarHandler}>
            <RxHamburgerMenu size="20px" />
          </button>
        )}
      <h1>Myday</h1>
      <AddTask isMyday={true} />
      </div>
      <div> {/**flex container */}
        <TaskList />
      </div>
    </div>
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
