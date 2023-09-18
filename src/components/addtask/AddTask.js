import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import classes from "./AddTask.module.css";
import DuePopover from "./DuePopover";
import RemindPopover from "./RemindPopover";
import RepeatPopover from "./RepeatPopover";


const initialTask = {
  id: "", // uuid
  task: "", // user input
  steps: {},
  myday: false,
  tasks: false,
  dueDate: "",
  repeat: "",
  remind: "",
  category: "",
  file: null,
  note: "",
  importance: false,
  created: "",
  completed: false,
};

const AddTask = (props) => {
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState(initialTask);
  const dueRef = useRef()
  const remindRef = useRef()

  const taskInputHandler = (event) => {
    // TODO: task만 다루고, 나머지는 등록할때 추가하기
    const createdTime = new Date().toISOString(); // date
    setTaskInput((prevState) => ({
      ...prevState,
      task: event.target.value,
      created: createdTime,
      id: uuid(),
      myday: props.myday,
    }));
  };

  const initializeButtons = () => {
    dueRef.current.resetDue()
    remindRef.current.resetRemind()
  }

  const addTaskHandler = () => {
    dispatch(addTodo(taskInput)); // redux에 todo 등록
    setTaskInput(initialTask); // input state 초기화
    initializeButtons()
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
  };

  const taskCreateValueHandler = (input, type) => {
    if (input instanceof Date){
      input = input.toISOString()
    }
    setTaskInput((prevState) => ({
      ...prevState,
      [type]: input
    }))
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
          <DuePopover setDueDateValue={taskCreateValueHandler} dueDateValue={taskInput.dueDate} ref={dueRef}/>
          <RemindPopover setRemindValue={taskCreateValueHandler} remindValue={taskInput.remind} ref={remindRef}/>
          <RepeatPopover />
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
 * taskInputHandler에서 todo text이외의 정보 분리하기(uuid...) 분리하기 OR debounce - typing 몇초 이상 끊길때에만 추가
 * 근데 addTaskHandler 내부에 dispatch & setState 같이 넣으면 async & sync 문제 발생
 *
 * 
 * ****
 * 
 * Repeat popover 만들기 -> repeat 설정하고 완료됐을 때, 해당 반복 시간에 imperative하게 task 생성해야함
 *
 * task등록 후 due, remind, repeat 버튼 & selectedtime, selected date text초기화 (해결)
 *
 * 
 * 
 * 
 * 
 * 
 * 지난날짜 선택했을 때, overdue 표시 (해결)
 * 어제, 내일 선택했을때 yesterday, tomorrow (해결)
 * calendar에서 저장없이 나갔을때 오늘로 초기화(보류)
 */
