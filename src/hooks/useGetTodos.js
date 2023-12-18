import { useDispatch, useSelector } from "react-redux";
import { useGetTodosApiQuery } from "../api/todoApiSlice";
import { setTodos } from "../store/todoSlice";
import { useEffect } from "react";

const useGetTodos = (queryOption) => {
  // todos를 RTKQ를 통해 가지고와서 local redux store에 저장함.
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // const {
  //   data: todoArrData,
  //   error,
  //   isLoading: isTodoLoading,
  //   refetch,
  // } = useGetTodosApiQuery({userId: user?.uid, queryOption}, { skip: !user?.uid });


  // 수정 전
  const {
    data: todoArrData,
    error,
    isLoading: isTodoLoading,
    refetch,
  } = useGetTodosApiQuery(user?.uid, { skip: !user?.uid });


  useEffect(() => {
    // console.log('useGetTodos hook execute');
    dispatch(setTodos(todoArrData));
  }, [todoArrData]);

};

export default useGetTodos;
