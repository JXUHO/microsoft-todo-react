import { useSelector, useDispatch } from "react-redux";
import { completeTodo, importanceTodo } from "../../store/todoSlice";
import { openDetail } from "../../store/uiSlice";

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
    <div className="flex items-center relative mt-2 min-h-52 px-4 py-0 bg-white rounded" style={{boxShadow: '0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)'}}>
      <span
        onClick={completedHandler}
        style={{ color: todo.complete && "red" }}
      >
        complete
      </span>

      <button onClick={() => detailOpenHandler(todo.id)}>
        <span>{todo.task}</span>
        <div>
          <ul>
            <li>{todo.complete && "completed"}</li>
            <li>{todo.repeated && "repeated"}</li>
            <li>{todo.repeatRule}</li>
            <li>{todo.dueDate}</li>
          </ul>
        </div>
      </button>
      <div
        onClick={importanceHandler}
        style={{ color: todo.importance && "red" }}
      >
        star
      </div>
    </div>
  );
};

export default TaskItem;

/**
 * detailOpenHandler를 누르면 현재 어떤 item인지 id를 전달함. 어디로?
 *
 */
