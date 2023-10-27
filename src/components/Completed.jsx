import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiDotsThreeBold } from "react-icons/pi";
import SortPopover from "./toolbar/SortPopover";
import SortIndicator from "./toolbar/SortIndicator";
import { useEffect } from "react";
import { setSortBy } from "../store/sortSlice";
import { GoCheckCircle } from "react-icons/go";
import CompleteList from "./tasks/CompleteList";
import { useState } from "react";
import sortTasks from "../utils/sortTasks";

const Completed = () => {
  const dispatch = useDispatch();
  const [todoArr, setTodoArr] = useState([]);
  const todos = useSelector((state) => state.todo.todos);
  const sortOrder = useSelector((state) => state.sort.completed.order);
  const sortBy = useSelector((state) => state.sort.completed.sortBy);
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isSortOptionSelected = useSelector(
    (state) => state.sort.completed.sortBy
  );

  const openSidebarHandler = () => {
    dispatch(openSidebar());
  };

  useEffect(() => {
    dispatch(setSortBy({ option: "completed", location: "completed" }));
  }, []);


  useEffect(() => {
    // myday, complete, sortBy 순서대로 적용해야함
    let todoTemp = todos.slice().reverse().filter((todo) => todo.complete);

    // sort옵션 적용
    if (sortBy) {
      setTodoArr(sortTasks(sortBy, sortOrder, todoTemp));
    } else {
      setTodoArr(todoTemp);
    }
  }, [todos, sortBy, sortOrder]);



  return (
    <>
      <div className="flex flex-shrink-0 relative items-center justify-center h-12 mx-6 my-4 ">
        <div className="flex items-center flex-1 min-w-100 mr-5 py-2 ml-1">
          <div className="flex flex-col pt-1">
            <div className="flex items-center">
              <div>
                {!isSidebarOpen ? (
                  <button onClick={openSidebarHandler} className="mr-2">
                    <RxHamburgerMenu size="20px" />
                  </button>
                ) : (
                  <div className="px-2 py-1.5 text-ms-blue">
                    <GoCheckCircle size="22px" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium py-2 text-ms-blue">Completed</h2>
              </div>
              <div className="px-3">
                <PiDotsThreeBold />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <SortPopover currentLocation="completed" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-end">
          {isSortOptionSelected && (
            <SortIndicator currentLocation="completed" />
          )}
        </div>
        <CompleteList todoArr={todoArr} currentLocation={"completed"}/>
      </div>
    </>
  );
};

export default Completed;