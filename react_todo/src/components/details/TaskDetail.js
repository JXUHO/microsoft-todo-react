import { useDispatch } from "react-redux";
import { removeTodo } from "../../store/todoSlice";


const TaskDetail = (props) => {
  const dispatch = useDispatch();



  return (
    <div>
      <div>
        detail body
      </div>
      <div>
        detail footer
        <button onClick={props.onCloseDetail}>close</button>
        <br/>
        created
        <button onClick={() => dispatch(removeTodo())}>delete</button>
      </div>
    </div>
  );
}

export default TaskDetail;

/**
 * TODO
 * 어느 task의 detail인지 props나 store에서 받아야함
 * dispatch(removeTodo())인자로 넘길 id 받아와야함
 * 상위 component는 RootPage...
 * 
 * 
 */