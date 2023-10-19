import { useEffect, useState } from "react";
import { BsSun, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeMydayTodo, changeOptionTodo } from "../../store/todoSlice";
import DetailRemindPopover from "./DetailRemindPopover";
import DetailDuePopover from "./DetailDuePopover";
import DetailRepeatPopover from "./DetailRepeatPopover";

const DetailOptions = ({ taskId }) => {
  const [isMyday, setIsMyday] = useState(false);
  const dispatch = useDispatch();
  const [isMydayHover, setIsMydayHover] = useState(false)

  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo.id === taskId)
  );

  useEffect(() => {
    setIsMyday(todo.myday);
  }, [todo.myday]);

  const addMydayHandler = () => {
    if (!todo.myday) {
      dispatch(changeMydayTodo(taskId));
    }
  };

  const removeMydayHandler = () => {
    if (todo.myday) {
      dispatch(changeMydayTodo(taskId));
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
          className="flex w-full items-center"
          style={{ color: isMyday ? "#2564cf" : "" }}
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
        <DetailRemindPopover taskId={taskId} />
        <DetailDuePopover taskId={taskId} />
        <DetailRepeatPopover taskId={taskId} />
      </div>
    </>
  );
};

export default DetailOptions;
