import { useDispatch, useSelector } from "react-redux";
import { useGetTodosApiQuery } from "../api/todoApiSlice";
import { setTodos } from "../store/todoSlice";


const useGetTodos = (userId) => {
  const dispatch = useDispatch()

  const {
    data: todoArrData,
    error,
    isLoading: isTodoLoading,
    refetch,
  } = useGetTodosApiQuery(userId, { skip: !userId });

  dispatch(setTodos(todoArrData))



};

export default useGetTodos;

