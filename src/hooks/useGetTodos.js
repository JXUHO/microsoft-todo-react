import { useSelector } from "react-redux";
import { useGetTodosApiQuery } from "../api/todoApiSlice";


const useGetTodos = (userId) => {
  const staticTodos = useSelector((state) => state.todo.todos);

  const {
    data: todoArrData,
    error,
    isLoading: isTodoLoading,
    refetch,
  } = useGetTodosApiQuery(userId, { skip: !userId });


  

   return {
    todos: todoArrData ? todoArrData : staticTodos,
    isApiData: !!todoArrData,
    isLoading: isTodoLoading,
  };
};

export default useGetTodos;

