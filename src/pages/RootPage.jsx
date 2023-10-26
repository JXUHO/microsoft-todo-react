import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeActiveStep, initializeActiveTasks } from "../store/activeSlice";
import { closeDetail } from "../store/uiSlice";
import { updateMydayTodo } from "../store/todoSlice";
import { setCtrl, setShift } from "../store/modifierSlice";
import TaskItemContextMenu from "../components/modals/TaskItemContextMenu";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);

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

  
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === "Control" ) {
        dispatch(setCtrl(true))
      } else if (e.key === 'Shift') {
        dispatch(setShift(true))
      }
    }
    const onKeyUp = (e) => {
      if (e.key ===  "Shift" ) {
        dispatch(setShift(false))
      }
      if (e.key === "Control") {
        dispatch(setCtrl(false))
      }
      if (e.key === "Escape") {
        dispatch(setCtrl(false))
        dispatch(setShift(false))
      }
    }
    document.addEventListener("keydown",onKeyDown)
    document.addEventListener("keyup",onKeyUp)
    return () => {
      document.removeEventListener("keydown",onKeyDown)
      document.removeEventListener("keyup",onKeyUp)
    }
  }, [])

  
  //const activeTasks = useSelector(state=>state.active.activeTasks)

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

      <TaskItemContextMenu/>
    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 우측 scrollbar conditional style 적용하기
 *
 */

