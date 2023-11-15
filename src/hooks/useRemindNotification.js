import { useDispatch, useSelector } from "react-redux";
import { setRemindedTodo } from "../store/todoSlice";
import {
  addActiveTasks,
  initializeActiveRange,
  initializeActiveTasks,
} from "../store/activeSlice";
import { openDetail } from "../store/uiSlice";
import { useEffect } from "react";
import { useSetRemindedTodoApiMutation } from "../api/todoApiSlice";
import useAuth from "./useAuth";
import useGetTodos from "./useGetTodos";


const useRemindNotification = () => {
  const dispatch = useDispatch();
  const {todos, isApiData, isLoading} = useGetTodos();
  // const todos = useSelector((state) => state.todo.todos);

  const { user, loading: isAuthLoading } = useAuth();
  const [setRemindedTodoApi] = useSetRemindedTodoApiMutation();

  useEffect(() => {
    if (todos.some((todo) => todo.remind)) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      for (const todo of todos) {
        if (
          todo.remind &&
          !todo.reminded &&
          new Date(todo.remind) <= currentTime
        ) {
          notifyMe(todo);
          if (user) {
            setRemindedTodoApi({todoId: todo.id, user, value: true})
          } else {
            dispatch(setRemindedTodo({ id: todo.id, value: true }));
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [todos]);

  function notifyMe(todo) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("To do", { body: todo.task });
      notification.onclick = (event) => {
        event.preventDefault();
        dispatch(initializeActiveTasks());
        dispatch(initializeActiveRange());
        dispatch(addActiveTasks(todo.id));
        dispatch(openDetail());
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("To do", { body: todo.task });
          notification.onclick = (event) => {
            event.preventDefault();
            dispatch(initializeActiveTasks());
            dispatch(initializeActiveRange());
            dispatch(addActiveTasks(todo.id));
            dispatch(openDetail());
          };
        }
      });
    }
  }
};

export default useRemindNotification;
