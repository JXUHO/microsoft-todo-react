import {useDispatch, useSelector } from "react-redux";
import DetailHeader from "./DetailHeader";
import DetailSteps from "./DetailSteps";
import DetailOptions from "./DetailOptions";
import DetailCategories from "./DetailCategories";
import DetailAddFile from "./DetailAddFile";
import DetailNote from "./DetailNote";
import { changeOptionTodo } from "../../store/todoSlice";
import getLastTimeOfDay, { getNextClosestDayOfWeekFromDate } from "../../utils/getDates";
import { useEffect } from "react";


const Details = ({taskId}) => {
  const todos = useSelector((state) => state.todo.todos);
  const todo = todos.find((todo) => todo.id === taskId);
  const dispatch = useDispatch()


  useEffect(() => {
    // due 제거되면 repeat도 제거
    if (!todo.dueDate && todo.repeatRule) {
      dispatch(changeOptionTodo({id:taskId, option: "repeatRule", content: ""}))  
    }
  }, [todo.dueDate]);

  useEffect(() => {
    // repeat설정했을때, due버튼 설정
    if (todo.repeatRule && !todo.dueDate) {
      if (todo.repeatRule.split("-").length === 2) {
        // due를 getLastTimeOfDay()로 설정
        dispatch(changeOptionTodo({id:taskId, option:"dueDate", content: getLastTimeOfDay().toISOString()}))
      } else {
        const today = new Date();
        dispatch(changeOptionTodo({id:taskId, option:"dueDate", content: getNextClosestDayOfWeekFromDate(
          today,
          todo.repeatRule.split("-").slice(2)
        ).toISOString()}))
      }
    }
  }, [todo.repeatRule]);





  return( 
    <div className="py-0 pr-4 pl-6 mt-4 flex-1 overflow-y-scroll overflow-x-hidden ">
      <DetailHeader taskId={taskId}/>
      <DetailSteps taskId={taskId}/>
      <DetailOptions taskId={taskId}/>
      <DetailCategories taskId={taskId}/>
      <DetailAddFile taskId={taskId}/>
      <DetailNote taskId={taskId}/>
    </div>
  )

};


export default Details;


/**
 * TODO
 * - scrollable div 구현하기
 * 
 */