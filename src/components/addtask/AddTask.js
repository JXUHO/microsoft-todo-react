import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import TaskButton from "./TaskButton";
import DueDate from "../Popover/DueDate";
import getDateString from "../date/getDate";
import classes from "./AddTask.module.css";

const initialTask = {
  id: "", // uuid
  task: "", // user input
  steps: {},
  myday: false,
  tasks: false,
  date: {},
  repeat: "",
  remind: "",
  category: "",
  file: null,
  note: "",
  importance: false,
  created: {},
  completed: false,
};

const AddTask = (props) => {
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState(initialTask);

  const taskInputHandler = (event) => {
    const createdTime = getDateString(); // date

    setTaskInput((prevState) => ({
      ...prevState,
      task: event.target.value,
      created: "temp", // 수정 (redux 저장할때 객체 vs string 뭐가 더 나은지 생각)
      id: uuid(),
      myday: props.myday,
    }));
  };

  const addTaskHandler = () => {
    dispatch(addTodo(taskInput));
    setTaskInput(initialTask);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
  };

  const dueDateHandler = () => {  // DueDate에서 날짜 받아옴, redux에 날짜 저장
    
  }


  return (
    <div className={classes.addTaskBar}>
      <div>
        <input
          placeholder="Add a task"
          onChange={taskInputHandler}
          value={taskInput.task}
          onKeyDown={handleEnterKeyPress}
        />
      </div>
      <div className={classes.taskBar}>
        <div className={classes.taskButtons}>
          {/* <TaskButtons onAddDetail={addDetailHandler} /> */}

          <TaskButton buttonDetail={{ buttonIcon: "Due", hover: "Add due date"}}>  
            <DueDate />
          </TaskButton>
          <TaskButton buttonDetail={{ buttonIcon: "Remind", hover: "Remind me"}} >
            remind
          </TaskButton>
          <TaskButton buttonDetail={{ buttonIcon: "Repeat", hover: "Repeat"}}>
            repeat
          </TaskButton>
        </div>

        <button disabled={!taskInput.task.trim()} onClick={addTaskHandler}>
          add
        </button>
      </div>
    </div>
  );
};

export default AddTask;

/**
 * TODO
 * taskInputHandler에서 user input 다른 정보 분리하기, user input이외의 정보들은 addTaskHandler에서 추가하기
 * 근데 dispatch & setState 같이 넣으면 async & sync 문제 발생
 *
 *
 * TaskButton의 한 인스턴스에서 state가 true이면 다른 인스턴스의 state를 false로 만들어야함
 *
 *
 */
