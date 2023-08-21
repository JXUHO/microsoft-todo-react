import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  completeTodo,
  importanceTodo,
} from "../../store/todoSlice";
import { openDetail } from "../../store/uiSlice";

const TaskItem = ({ todo }) => {
  // const [collapse, setCollapse] = useOutletContext();
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const completedHandler = () => {
    dispatch(completeTodo(todo.id));
  };

  const importanceHandler = () => {
    dispatch(importanceTodo(todo.id));
  };

  const detailOpenHandler = (id) => {
    dispatch(openDetail(id))
  };

  return (
    <>
      <button onClick={completedHandler}>completed</button>
      <h3 onClick={() => detailOpenHandler(todo.id)}>{todo.task}</h3> 
      <div>
        metaDataInfo
        {todo.completed && <p>completed</p>}
        {todo.importance && <p>importance</p>}
      </div>
      <button onClick={importanceHandler}>star</button>
    </>
  );
};

export default TaskItem;


/**
 * detailOpenHandler를 누르면 현재 어떤 item인지 id를 전달함. 어디로?
 * 
 */