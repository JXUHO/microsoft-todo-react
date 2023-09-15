import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import DueDate from "../Popover/DueDate";
import getDate, { getCustomFormatDateString } from "../date/getDate";
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

  const [dueButtonText, setDueButtonText] = useState("Due");
  const [showDueRemoveButton, setShowDueRemoveButton] = useState(false);
  const [dueCalendarDate, setDueCalendarDate] = useState(new Date());

  const duePopoverRef = useRef(null);
  const dueTooltipRef = useRef(null);
  const dueCalendarRef = useRef(null);
  // const remindPopoverRef = useRef(null);
  // const remindTooltipRef = useRef(null);

  const taskInputHandler = (event) => {
    // TODO: task만 다루고, 나머지는 등록할때 추가하기
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

  const dueDateCalendarHandler = () => {
    setDueButtonText(getCustomFormatDateString(dueCalendarDate));
    setTaskInput((prevState) => ({
      ...prevState,
      dueDate: dueCalendarDate,
    }));
  }

  const dueDateHandler = (dueDate) => {
    setDueButtonText(dueDate.text);
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
    setDueButtonText("Due");
    setShowDueRemoveButton(false);
  };

  useEffect(() => {
    // due 설정됐을때 remove due date버튼 생성
    if (taskInput.dueDate) {
      setShowDueRemoveButton(true);
    }
  }, [taskInput]);

  const showCalendarHandler = () => {
    const datepicker = document.getElementById("datepicker");
    if (datepicker) {
      datepicker.click();
    }
  };

  const closePopoverHandler = () => {
    duePopoverRef.current.setVisibility(false);
    // reminder, repeat
  };

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
          <div>
            <button id="due">{dueButtonText}</button>
            <span id="dueCalendar" onClick={showCalendarHandler}></span>
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
                showCalendar={showCalendarHandler}
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

            {/* calendar  */}
            <DatePicker
              id="datepicker"
              ref={dueCalendarRef}
              selected={dueCalendarDate}
              onChange={(date) => setDueCalendarDate(date)}
              shouldCloseOnSelect={false}
              customInput={<span></span>}
            >
              <div>
                <button
                  onClick={() => {
                    dueCalendarRef.current.setOpen(false);
                    dueDateCalendarHandler()
                  }}
                >
                  Save
                </button>
              </div>
            </DatePicker>
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
 * taskInputHandler에서 todo text이외의 정보 분리하기(uuid...) 분리하기 OR debounce - typing 몇초 이상 끊길때에만 추가
 * 근데 addTaskHandler 내부에 dispatch & setState 같이 넣으면 async & sync 문제 발생
 *
 * Due date 버튼을 별도 component로 분리하기
 * 
 *
 *
 *
 *
 */
