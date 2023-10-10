import { useEffect, useState } from "react";
import { BsRepeat, BsSun, BsXLg } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { changeMydayTodo } from "../../store/todoSlice";

const DetailOptions = ({ taskId }) => {
  const [isMyday, setIsMyday] = useState(false);
  const dispatch = useDispatch()

  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo.id === taskId)
  );

  useEffect(() => {
    setIsMyday(todo.myday);
  }, [todo.myday]);

  const addMydayHandler = () => {
    if (!todo.myday) {
      dispatch(changeMydayTodo(taskId))
    }
  }
  
  const removeMydayHandler = () => {
    if (todo.myday) {
      dispatch(changeMydayTodo(taskId))
    }
  }


  return (
    <>
      <div
        className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
        onClick={addMydayHandler}
      >
        <div
          className="flex w-full items-center"
          style={{ color: isMyday ? "#2564cf" : '' }}
        >
          <BsSun size="16px" />
          <span className="mx-4">
            {isMyday ? "Added to My Day" : "Add to My Day"}
          </span>
        </div>
        {isMyday && <button onClick={removeMydayHandler}>
          <BsXLg size="16px" style={{ paddingRight: "2px" }} />
        </button>}
      </div>

      <div className="rounded my-2">
        <div
          className="flex bg-white w-full  p-4  items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          style={{ borderBottom: "solid 0.5px #edebe9" }}
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <VscBell size="17px" color="#797775" />
            <span className="mx-4">Remind me</span>
          </div>
        </div>
        <div
          className="flex bg-white w-full p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          style={{ borderBottom: "solid 0.5px #edebe9" }}
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <IoCalendarOutline size="17px" color="#797775" />
            <span className="mx-4">Add due date</span>
          </div>
        </div>
        <div
          className="flex bg-white w-full p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <BsRepeat size="17px" color="#797775" />
            <span className="mx-4">Repeat</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOptions;
