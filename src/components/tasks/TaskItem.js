import { useSelector, useDispatch } from "react-redux";
import { completeTodo, importanceTodo } from "../../store/todoSlice";
import { openDetail } from "../../store/uiSlice";

import classes from "./TaskItem.module.css";

const TaskItem = ({ todo }) => {
  const todos = useSelector((state) => state.todo.todos);
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
    <div className={classes.taskItem}>
      <span onClick={completedHandler} style={{color: todo.completed && "red"}}>completed</span>

      <button onClick={() => detailOpenHandler(todo.id)}>
        <span>{todo.task}</span>
        <div>
          metaDataInfo
        </div>
      </button>
      <div onClick={importanceHandler} style={{color: todo.importance && "red"}}>star</div>
    </div>
  );
};

export default TaskItem;

/**
 * detailOpenHandler를 누르면 현재 어떤 item인지 id를 전달함. 어디로?
 *
 */
