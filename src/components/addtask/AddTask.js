import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import DueDate from "../Popover/DueDate";
import getDate from "../date/getDate";
import classes from "./AddTask.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popper from "../ui/Popper";

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
  created: {},
  completed: false,
};

const AddTask = (props) => {
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState(initialTask);
  const [dueButtonText, setDueButtonText] = useState("Due")
  const [showDueRemoveButton, setShowDueRemoveButton] = useState(false)

  const duePopoverRef = useRef(null);
  const dueTooltipRef = useRef(null);
  const dueCalendarRef = useRef(null);
  const remindPopoverRef = useRef(null);
  const remindTooltipRef = useRef(null);


  const taskInputHandler = (event) => {
    const createdTime = getDate(); // date

    setTaskInput((prevState) => ({
      ...prevState,
      task: event.target.value,
      created: createdTime,
      id: uuid(),
      myday: props.myday,
    }));
  };

  const addTaskHandler = () => {
    dispatch(addTodo(taskInput)); // redux에 todo 등록
    setTaskInput(initialTask); // input state 초기화
  };

  const handleEnterKeyPress = (event) => {
    // enter키 todo add
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
  };

  const dueDateHandler = (dueDate) => {
    setDueButtonText(dueDate.text)
    setTaskInput((prevState) => ({
      ...prevState,
      dueDate: dueDate.date,
    }));
  };

  const resetDueHandler = () => {
    setTaskInput((prevState) => ({
      ...prevState,
      dueDate: "",
    }));
    setDueButtonText("Due")
    setShowDueRemoveButton(false);
  }

  const closePopoverHandler = () => {
    duePopoverRef.current.setVisibility(false);
    // reminder, repeat
    // remindPopoverRef.current.setVisibility(false);
  };


  useEffect(() => {  // due 설정됐을때 delete버튼 만들기 위함
    if (taskInput.dueDate) {
      // console.log("object not empty");
      setShowDueRemoveButton(true);
    }
  }, [taskInput]);


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

          <div>
            <button id="due">{dueButtonText}</button>
            <Popper
              initOpen={false}
              ref={duePopoverRef}
              placement="bottom"
              target="due"
              toggle="legacy"
            >
              <DueDate
                onAddDueDate={dueDateHandler}
                onClosePopover={closePopoverHandler}
                showRemoveButton={showDueRemoveButton}
                resetDue={resetDueHandler}
              />
            </Popper>
            <Popper
              initOpen={false}
              ref={dueTooltipRef}
              placement="bottom"
              target="due"
              toggle="hover"
            >
              Add due date
            </Popper>
            {/* <Popper
              initOpen={false}
              ref={dueCalendarRef}
              placement="bottom"
              target="due"
              toggle="legacy"
            >
              Calendar
            </Popper> */}

          </div>

          {/* <div>
            <button id="remind">remind</button>
            <Popper
              initOpen={false}
              ref={remindPopoverRef}
              placement="bottom"
              target="remind"
              toggle="legacy"
            >
              remind
            </Popper>
            <Popper
              initOpen={false}
              ref={remindTooltipRef}
              placement="bottom"
              target="remind"
              toggle="hover"
            >
              Remind me
            </Popper>
          </div> */}

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
 * duedate에 calendar 붙이기
 * 
 * 
 *
 *
 */
