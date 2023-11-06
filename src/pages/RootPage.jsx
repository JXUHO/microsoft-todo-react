import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initializeActiveStep,
  initializeActiveTasks,
} from "../store/activeSlice";
import { closeDetail, closeSidebar } from "../store/uiSlice";
import { updateMydayTodo } from "../store/todoSlice";
import TaskItemContextMenu from "../components/modals/TaskItemContextMenu";
import DeleteTaskDialog from "../components/modals/DeleteTaskDialog";
import useRemindNotification from "../hooks/useRemindNotification";
import useKeyDown from "../hooks/useKeydown";
import useViewport from "../hooks/useViewPort";
import AppLauncher from "../panels/AppLauncher";
import SidebarOverlay from "../components/ui/SidebarOverlay";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeActiveTasks());
    dispatch(initializeActiveStep());
    dispatch(closeDetail());
  }, [location]);

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    updateMydayTodo();
  }, []);

  useKeyDown();
  useRemindNotification();

  const { width: viewportWidth } = useViewport();
  const detailWidth = useSelector((state) => state.ui.detailWidth);

  useEffect(() => {
    if (viewportWidth - detailWidth < 560) {
      dispatch(closeSidebar());
    }
  }, [viewportWidth, detailWidth]);

  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden">
      <Header />
      <AppLauncher />
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarOverlay />
        {isSidebarOpen && <Sidebar />}
        <div className="flex flex-1 flex-col bg-ms-background overflow-hidden">
          <Outlet />
        </div>
        {isDetailOpen && <TaskDetail />}
      </div>
      <TaskItemContextMenu />
      <DeleteTaskDialog />
    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 우측 scrollbar conditional style 적용하기
 *
 */
