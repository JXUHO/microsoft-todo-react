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
import TaskItemContextMenu from "../components/modals/TaskItemContextMenu";
import DeleteTaskDialog from "../components/modals/DeleteTaskDialog";
import useRemindNotification from "../hooks/useRemindNotification";
import useKeyDown from "../hooks/useKeydown";
import useViewport from "../hooks/useViewPort";
import SidebarOverlay from "../components/ui/SidebarOverlay";
import HeaderPanels from "../panels/HeaderPanels";
import useTheme from "../hooks/useTheme";
import useGetTodos from "../hooks/useGetTodos";
import useAuth from "../hooks/useAuth";
import { useSetMydayTodoApiMutation } from "../api/todoApiSlice";
import useUpdateMyday from "../hooks/useUpdateMyday";


const RootPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const { width: viewportWidth } = useViewport();
  const detailWidth = useSelector((state) => state.ui.detailWidth);
  const isDeleteDialogOpen = useSelector((state) => state.ui.dialog);
  const user = useSelector(state => state.auth.user)
  const todos = useSelector(state => state.todo.todos)
  const [setMydayTodoApi] = useSetMydayTodoApiMutation()


  useAuth()
  useGetTodos()

  useUpdateMyday({setMydayTodoApi, user})

  
  useKeyDown();
  useRemindNotification();
  useTheme();

  useEffect(() => {
    dispatch(initializeActiveTasks());
    dispatch(initializeActiveStep());
    dispatch(closeDetail());
  }, [location]);

  useEffect(() => {
    if (viewportWidth - detailWidth < 560) {
      dispatch(closeSidebar());
    }
  }, [viewportWidth, detailWidth]);


  if (!user || !todos) {
    return <h1>loading...</h1>
  }

  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden text-black">
      <Header />
      <HeaderPanels/>
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarOverlay />
        {isSidebarOpen && <Sidebar />}
        <div className="flex flex-1 flex-col bg-ms-background overflow-hidden">
          <Outlet />
        </div>
        {isDetailOpen && <TaskDetail/>}
      </div>
      <TaskItemContextMenu />
      {isDeleteDialogOpen && <DeleteTaskDialog  isOpen={isDeleteDialogOpen}/>}
    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 우측 scrollbar conditional style 적용하기
 *
 * 
 * 
 */
