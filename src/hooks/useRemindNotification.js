import { useDispatch, useSelector } from "react-redux";
import {
  addActiveTasks,
  initializeActiveRange,
  initializeActiveTasks,
} from "../store/activeSlice";
import { openDetail } from "../store/uiSlice";
import { useEffect } from "react";
import { useSetRemindedTodoApiMutation } from "../api/todoApiSlice";

const useRemindNotification = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const user = useSelector((state) => state.auth.user);
  const [setRemindedTodoApi] = useSetRemindedTodoApiMutation();

  useEffect(() => {
    if (!todos) return;
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
          setRemindedTodoApi({ todoId: todo.id, user, value: true });
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
