import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../../store/todoSlice";
import { closeDetail } from "../../store/uiSlice";
import DetailBody from "./DetailBody";
import classes from "./TaskDetail.module.css"

const TaskDetail = () => {
  const detailId = useSelector(state => state.ui.id)
  const dispatch = useDispatch();


  const closeDetailHandler = () => {
    dispatch(closeDetail())
  }

  const removeTaskHandler = (id) => {
    dispatch(removeTodo(id))
    dispatch(closeDetail())
  }


  return (
    <div className={classes.taskDetail}>
      <div>
        <DetailBody id={detailId}/>
      </div>
      <div>
        detail footer
        <button onClick={closeDetailHandler}>hide detail view</button>
        <br/>
        created time
        <button onClick={() => removeTaskHandler(detailId)}>delete task</button>
      </div>
    </div>
  );
}

export default TaskDetail;

/**
 * TODO
 * 받아온 detailId로 detail body 구현 가능
 * 
 * 
 */