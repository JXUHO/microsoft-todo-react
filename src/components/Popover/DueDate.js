import { useDispatch } from "react-redux";

import Popover from "./Popover";
import PopoverItem from "./PopoverItem";

// const initialTask = {
//   id: "",
//   task: "",
//   steps: {},
//   myday: false,
//   date: {},
//   repeat: "",
//   remind: "",
//   category: "",
//   file: null,
//   note: "",
//   importance: false,
//   created: {},
//   completed: false,
// };


const DueDate = (props) => {
  const dispatch = useDispatch();  
  

  const daysOfWeek  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date()
  
  const todayIndex = currentDate.getDay()  // 0 - 6
  const todayDate = currentDate.toISOString();
  console.log(todayDate)
  
  const addDateHandler = () => {
    props.onAddDetail({date: ""})
  }




  return (
    <div>
      <div>Due</div>
      <ul>
        <li>
          <button onClick={() => addDateHandler(todayDate)}>
            <span>Today </span>
            <span>{daysOfWeek[todayIndex]}</span>
          </button>
        </li>
        <li>
        <button>
            <span>Tomorrow </span>
            <span>{daysOfWeek[(todayIndex + 1) % 7]}</span>
          </button>
        </li>
        <li>
        <button>
            <span>Next week </span>
            <span>{daysOfWeek[todayIndex]}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button>Pick a date</button>
        </li>
      </ul>
    </div>
  );
};

export default DueDate;


/**
 * today, tomorrow, next week 설정하기
 * 
 * 
 * date를 redux로 빼서 함께 관리??? 생각해보기
 * 
 * 
 * 
 * TODO
 * todayDate를 연월일로 잘라서 가공하기
 * addDateHandler를 tomorrow, next week에도 붙이기
 * 
 * 
 * 
 */