import {useSelector } from "react-redux";
import DetailHeader from "./DetailHeader";


const Details = ({taskId}) => {
  const todos = useSelector((state) => state.todo.todos);
  const todo = todos.find((todo) => todo.id === taskId);





  return( 
    <div className="py-0 pr-4 pl-6 mt-4 flex-1 overflow-y-scroll overflow-x-hidden ">
      <DetailHeader taskId={taskId}/>
    </div>
  )

};


export default Details;


/**
 * TODO
 * - scrollable div 구현하기
 * 
 */