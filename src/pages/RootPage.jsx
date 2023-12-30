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
import { closeDetail } from "../store/uiSlice";
import TaskItemContextMenu from "../components/modals/TaskItemContextMenu";
import DeleteTaskDialog from "../components/modals/DeleteTaskDialog";
import useRemindNotification from "../hooks/useRemindNotification";
import SidebarOverlay from "../components/ui/SidebarOverlay";
import HeaderPanels from "../panels/HeaderPanels";
import useTheme from "../hooks/useTheme";
import useGetTodos from "../hooks/useGetTodos";
import useAuth from "../hooks/useAuth";
import useUpdateMyday from "../hooks/useUpdateMyday";
import Loading from "../components/Loading";

const RootPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const { isLoading: isAuthLoading } = useAuth();

  console.log("rootpage render");

  useGetTodos();
  useUpdateMyday();
  useRemindNotification();
  useTheme();

  useEffect(() => {
    dispatch(initializeActiveTasks());
    dispatch(initializeActiveStep());
    dispatch(closeDetail());
  }, [location]);


  if (!todos || isAuthLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden text-black">
      <Header />
      <HeaderPanels />
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarOverlay />
        <Sidebar />
        <div className="flex flex-1 flex-col bg-ms-background overflow-hidden">
          <Outlet />
        </div>
        <TaskDetail />
      </div>
      <TaskItemContextMenu />
      <DeleteTaskDialog />
    </div>
  );
};

export default RootPage;
