import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeActiveStep, initializeActiveTasks } from "../store/activeSlice";
import { closeDetail } from "../store/uiSlice";
import { updateMydayTodo } from "../store/todoSlice";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const todoArr = useSelector((state) => state.todo.todos);

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeActiveTasks())
    dispatch(initializeActiveStep())
    dispatch(closeDetail());
  }, [location])

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    updateMydayTodo()
  }, [dispatch])

  
  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden"> {/**root */}

      <Header />  

      <div className="flex flex-1 overflow-hidden">   {/**app */}
        {isSidebarOpen && <Sidebar />}  {/**left column */}
        <div className="flex flex-1 flex-col bg-ms-background ">
          <Outlet />   {/**center column */}
        </div>
        {isDetailOpen && <TaskDetail/>}   {/**right column */}
      </div>

    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 우측 scrollbar conditional style 적용하기
 *
 */

