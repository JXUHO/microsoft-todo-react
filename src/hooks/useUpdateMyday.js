import { useEffect } from "react";
import { isDateToday } from "../utils/getDates";
import { updateMydayTodo } from "../store/todoSlice";


const useUpdateMyday = ({todos, isApiData, setMydayTodoApi, user}) => {

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    if (isApiData) {
      todos.map((todo) => {
        if (
          !isDateToday(new Date(todo.created)) &&
          todo.myday &&
          !isDateToday(new Date(todo.dueDate))
        ) {
          setMydayTodoApi({todoId:todo.id, user, value: false})
        } else if (
          !isDateToday(new Date(todo.created)) &&
          isDateToday(new Date(todo.dueDate))
        ) {
          setMydayTodoApi({todoId:todo.id, user, value: true})
        } else if (
          !todo.dueDate &&
          !isDateToday(new Date(todo.created)) &&
          todo.myday
        ) {
          setMydayTodoApi({todoId:todo.id, user, value: false})
        }
      });
    } else {
      updateMydayTodo();
    }

  }, []);

}

export default useUpdateMyday;