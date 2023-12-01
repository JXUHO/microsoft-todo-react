import { useEffect } from "react";
import { isDateToday } from "../utils/getDates";
import { useSelector } from "react-redux";
import { useSetMydayTodoApiMutation } from "../api/todoApiSlice";

const useUpdateMyday = () => {
  const todos = useSelector((state) => state.todo.todos);
  const user = useSelector(state => state.auth.user)
  const [setMydayTodoApi] = useSetMydayTodoApiMutation()

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    if (!todos || !user) return;
    todos.map((todo) => {
      if (
        !isDateToday(new Date(todo.created)) &&
        todo.myday &&
        !isDateToday(new Date(todo.dueDate))
      ) {
        setMydayTodoApi({ todoId: todo.id, user, value: false });
      } else if (
        !isDateToday(new Date(todo.created)) &&
        isDateToday(new Date(todo.dueDate))
      ) {
        setMydayTodoApi({ todoId: todo.id, user, value: true });
      } else if (
        !todo.dueDate &&
        !isDateToday(new Date(todo.created)) &&
        todo.myday
      ) {
        setMydayTodoApi({ todoId: todo.id, user, value: false });
      }
    });
  }, [todos,  setMydayTodoApi, user]);
};

export default useUpdateMyday;
