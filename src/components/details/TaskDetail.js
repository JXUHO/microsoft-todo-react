import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../../store/todoSlice";
import { closeDetail } from "../../store/uiSlice";

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
    <div>
      <div>
        detail body
      </div>
      <div>
        detail footer
        <button onClick={closeDetailHandler}>close</button>
        <br/>
        created
        <button onClick={() => removeTaskHandler(detailId)}>delete</button>
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