import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeActiveStep, initializeActiveTask } from "../store/activeSlice";
import { closeDetail } from "../store/uiSlice";
import { addTodo, changeDueDateTodo, repeatedTodo } from "../store/todoSlice";
import repeatTask from "../utils/repeatTask";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const todoArr = useSelector((state) => state.todo.todos);

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeActiveTask())
    dispatch(initializeActiveStep())
    dispatch(closeDetail());
  }, [location])

  // useEffect(() => {
  //   // repeat완료됐을때 새로운 task생성 & due와 repeat어긋났을때 due 수정
  //   todoArr.map((todo) => {
  //     if (!todo.repeatRule) return;
  //     const repeatInfo = repeatTask(todo);
  //     if (!repeatInfo) return;

  //     // repeatRule에 따라 duedate를 변경하는 것은 addTodo로 이동시킬 수 있음
  //     // if (repeatInfo instanceof Date) {
  //     //   dispatch(
  //     //     changeDueDateTodo({ id: todo.id, dueDate: repeatInfo.toISOString() })
  //     //   );

  //     // } 
  //     // else {
  //     //   // 새로운 repeat task를 생성하는 것은 complete됐을 때로 수정할 수 있음
  //     //   dispatch(repeatedTodo(todo.id));
  //     //   dispatch(addTodo(repeatInfo));
  //     // }

  //     // todo의 created가 오늘이 아니고, myday가 true이고, dueDate가 오늘이 아니면 myday를 false로 변경.


  //   });
  // }, [todoArr, dispatch]);
  
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


/**
 *   useEffect(() => {
    // repeat완료됐을때 새로운 task생성 & due와 repeat어긋났을때 due 수정
    todoArr.map((todo) => {
      const repeatInfo = repeatTask(todo);
      if (!repeatInfo) return;
      if (repeatInfo instanceof Date) {
        dispatch(
          changeDueDateTodo({ id: todo.id, dueDate: repeatInfo.toISOString() })
        );
      } else {
        dispatch(repeatedTodo(todo.id));
        dispatch(addTodo(repeatInfo));
      }
    });
  }, [todoArr, dispatch]);
 */