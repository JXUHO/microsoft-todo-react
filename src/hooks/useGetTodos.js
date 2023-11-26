import { useSelector } from "react-redux";
import { useGetTodosApiQuery } from "../api/todoApiSlice";
import useAuth from "./useAuth";


const useGetTodos = (userId) => {
  const staticTodos = useSelector((state) => state.todo.todos);
  const { user, loading: isAuthLoading } = useAuth();
  const {
    data: todoArrData,
    error,
    isLoading: isTodoLoading,
    refetch,
  } = useGetTodosApiQuery(userId, { skip: !userId });

  // console.log(useGetTodosApiQuery);
  // let todoArrData = []
  // let isTodoLoading = false

  console.log('useGetTodos');
  console.log(todoArrData);

   return {
    todos: todoArrData ? todoArrData : staticTodos,
    isApiData: !!todoArrData,
    isLoading: isTodoLoading,
  };
};

export default useGetTodos;

