import { useSelector } from "react-redux";
import { useGetTodosApiQuery } from "../api/todoApiSlice";
import useAuth from "./useAuth";


const useGetTodos = () => {
  const staticTodos = useSelector((state) => state.todo.todos);
  const { user, loading: isAuthLoading } = useAuth();
  const {
    data: todoArrData,
    error,
    isLoading: isTodoLoading,
    refetch,
  } = useGetTodosApiQuery(user?.uid, { skip: !user });

  return {
    todos: todoArrData ? todoArrData : staticTodos,
    isApiData: !!todoArrData,
    isLoading: isAuthLoading || isTodoLoading,
  };
};

export default useGetTodos;

