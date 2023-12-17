import { useEffect } from "react";
import { isDateToday } from "../utils/getDates";
import { useSelector } from "react-redux";
import { useSetMydayTodoApiMutation } from "../api/todoApiSlice";
import { useGetUserApiQuery, useSetUpdatedApiMutation } from "../api/userApiSlice";

const useUpdateMyday = () => {
  const todos = useSelector((state) => state.todo.todos);
  const user = useSelector((state) => state.auth.user);
  const [setMydayTodoApi] = useSetMydayTodoApiMutation();

  const {data: userData} = useGetUserApiQuery(user?.uid)
  const [setUpdatedApi] = useSetUpdatedApiMutation()

  // console.log('useUpdateMyday');

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    // db에 today가 오늘이면 pass, 일치하지 않으면 아래 코드 실행하고 today를 오늘로 설정.
    if (!todos || !user || !userData) return;

    if (userData.updated === new Date().toDateString()) return;
    
    todos.map((todo) => {
      // console.log('todoItem myday update');
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

    setUpdatedApi({userId: user.uid, updated: new Date().toDateString()})


  }, [todos, user, userData]);
};

export default useUpdateMyday;



/**
 * 문제
 *
 * 모든 todos에 대한 연산을 수행하므로, task개수가 많아질수록 성능이 저하된다.
 * log하면 알 수 있는데, 모든 tasks에 대한 연산이 수행된다
 *
 * 해결
 * 날짜를 체크하면 될듯? 오늘 지났는지, 지나지 않았는지 체크
 * 오늘 날짜를 db에 저장. 오늘과 db에 저장된 오늘이 일치하지 않으면, 로직 수행하고 db의 오늘을 업데이트
 *
 *
 */
