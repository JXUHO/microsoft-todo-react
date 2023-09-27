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
    <div className="h-full w-full">
      <div className="block relative shrink-0 items-center mx-6 my-4 h-18">
        {!isSidebarOpen && (
          <button onClick={openSidebarHandler}>
            <RxHamburgerMenu size="20px" />
          </button>
        )}
        <h2 className="text-xl font-medium">My Day</h2>
        <span>wednesday</span>
      </div>

      <div>
        <AddTask isMyday={true} />
        <TaskList />
      </div>
    </div>
  );
};

// {!isSidebarOpen && (
//   <button onClick={openSidebarHandler}>
//     <RxHamburgerMenu size="20px" />
//   </button>
// )}
// <h2 className="text-xl font-medium">My Day</h2>
// <span>wednesday</span>

export default Myday;

/**
 * TODO
 * MyDayList 컴포넌트 만들기
 * CompletedTaskList를 분리하지 않음
 *
 *
 */
