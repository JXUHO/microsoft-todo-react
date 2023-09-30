import { useSelector, useDispatch } from "react-redux";
import { completeTodo, importanceTodo } from "../../store/todoSlice";
import { openDetail } from "../../store/uiSlice";
import { BsCircle, BsCheckCircle, BsStar } from "react-icons/bs";
import classes from "./TaskItem.module.css";

const TaskItem = ({ todo }) => {
  // const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const completedHandler = () => {
    dispatch(completeTodo(todo.id));
  };

  const importanceHandler = () => {
    dispatch(importanceTodo(todo.id));
  };

  const detailOpenHandler = (id) => {
    dispatch(openDetail(id));
  };

  return (
    <div
      className="flex items-center mt-2 min-h-52 px-4 py-0 bg-white rounded hover:bg-ms-white-hover"
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
      }}
    >
      <span
        onClick={completedHandler}
        style={{ color: todo.complete && "red" }}
        className="flex items-center justify-center w-8 h-8"
      >
        <BsCircle />
      </span>

      <button
        onClick={() => detailOpenHandler(todo.id)}
        className="hover:cursor-pointer px-3 py-2 flex-1 text-left"
      >
        <span>{todo.task}</span>
        <div>
          <span>{todo.complete && "completed"}</span>
          <span>{todo.repeated && "repeated"}</span>
          <span>{todo.repeatRule}</span>
          <span>{todo.dueDate}</span>
        </div>
      </button>
      <div
        onClick={importanceHandler}
        style={{ color: todo.importance && "red" }}
      >
        <BsStar />
      </div>
    </div>
  );
};

export default TaskItem;

/**
 * detailOpenHandler를 누르면 현재 어떤 item인지 id를 전달함. 어디로?
 *
 */
