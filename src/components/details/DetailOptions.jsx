import { useEffect, useState } from "react";
import { BsSun, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setMydayTodo } from "../../store/todoSlice";
import DetailRemindPopover from "./DetailRemindPopover";
import DetailDuePopover from "./DetailDuePopover";
import DetailRepeatPopover from "./DetailRepeatPopover";
import { useSetMydayTodoApiMutation } from "../../api/todoApiSlice";

const DetailOptions = ({ taskId, todo, isApiData }) => {
  const [isMyday, setIsMyday] = useState(false);
  const dispatch = useDispatch();
  const [isMydayHover, setIsMydayHover] = useState(false);

  // const todo = useSelector((state) =>
  //   state.todo.todos.find((todo) => todo.id === taskId)
  // );

  const user = useSelector(state => state.auth.user)
  const[setMydayTodoApi] = useSetMydayTodoApiMutation()


  const todoMyday = todo?.myday

  useEffect(() => {
    setIsMyday(todoMyday);
  }, [todoMyday]);

  const addMydayHandler = () => {
    if (!todoMyday) {
      if (user) {
        setMydayTodoApi({todoId: taskId, user, value: true})
      } else {
        dispatch(setMydayTodo({ id: taskId, value: true }));
      }
    }
  };

  const removeMydayHandler = () => {
    if (todoMyday) {
      if (user) {
        setMydayTodoApi({todoId: taskId, user, value: false})
      } else {
        dispatch(setMydayTodo({ id: taskId, value: false }));
      }
    }
  };

  return (
    <>
      <div
        className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
        onClick={addMydayHandler}
        onMouseOver={() => setIsMydayHover(true)}
        onMouseLeave={() => setIsMydayHover(false)}
      >
        <div
          className={`flex w-full items-center ${isMyday ? "text-ms-font-blue": ""}`}
        >
          <BsSun size="16px" />
          <span className="mx-4">
            {isMyday ? "Added to My Day" : "Add to My Day"}
          </span>
        </div>
        {isMyday && isMydayHover && (
          <button onClick={removeMydayHandler}>
            <BsXLg size="16px" style={{ paddingRight: "2px" }} />
          </button>
        )}
      </div>

      <div className="rounded my-2">
        <DetailRemindPopover taskId={taskId} todo={todo} />
        <DetailDuePopover taskId={taskId} todo={todo}/>
        <DetailRepeatPopover taskId={taskId} todo={todo}/>
      </div>
    </>
  );
};

export default DetailOptions;
