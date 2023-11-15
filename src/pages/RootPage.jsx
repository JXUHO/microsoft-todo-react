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
import SidebarOverlay from "../components/ui/SidebarOverlay";
import HeaderPanels from "../panels/HeaderPanels";
import useTheme from "../hooks/useTheme";
import useGetTodos from "../hooks/useGetTodos";
import useAuth from "../hooks/useAuth";
import { useSetMydayTodoApiMutation } from "../api/todoApiSlice";
import { isDateToday } from "../utils/getDates";
import useUpdateMyday from "../hooks/useUpdateMyday";


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


  const {todos, isApiData, isLoading} = useGetTodos();
  const [setMydayTodoApi] = useSetMydayTodoApiMutation()
  const {user, loading:isAuthLoading} = useAuth()


  useUpdateMyday({todos, isApiData, setMydayTodoApi, user})

  useKeyDown();
  useRemindNotification();
  useTheme();

  const { width: viewportWidth } = useViewport();
  const detailWidth = useSelector((state) => state.ui.detailWidth);

  useEffect(() => {
    if (viewportWidth - detailWidth < 560) {
      dispatch(closeSidebar());
    }
  }, [viewportWidth, detailWidth]);

  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden text-black">
      <Header />
      <HeaderPanels/>
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarOverlay />
        {isSidebarOpen && <Sidebar todos={todos} isApiData={isApiData} isLoading={isLoading}/>}
        <div className="flex flex-1 flex-col bg-ms-background overflow-hidden">
          <Outlet context={[todos, isApiData, isLoading]}/>
        </div>
        {isDetailOpen && <TaskDetail todos={todos} isApiData={isApiData} isLoading={isLoading}/>}
      </div>
      <TaskItemContextMenu todos={todos} isApiData={isApiData} isLoading={isLoading}/>
      <DeleteTaskDialog todos={todos} isApiData={isApiData} isLoading={isLoading}/>
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


  // useEffect(() => {
  //   // reload될 때, 날짜 변경됐으면 myday변경
  //   if (isApiData) {
  //     todos.map((todo) => {
  //       if (
  //         !isDateToday(new Date(todo.created)) &&
  //         todo.myday &&
  //         !isDateToday(new Date(todo.dueDate))
  //       ) {
  //         setMydayTodoApi({todoId:todo.id, user, value: false})
  //       } else if (
  //         !isDateToday(new Date(todo.created)) &&
  //         isDateToday(new Date(todo.dueDate))
  //       ) {
  //         setMydayTodoApi({todoId:todo.id, user, value: true})
  //       } else if (
  //         !todo.dueDate &&
  //         !isDateToday(new Date(todo.created)) &&
  //         todo.myday
  //       ) {
  //         setMydayTodoApi({todoId:todo.id, user, value: false})
  //       }
  //     });
  //   } else {
  //     updateMydayTodo();
  //   }

  // }, []);

