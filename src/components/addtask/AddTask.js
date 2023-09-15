import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import DueDate from "./DueDate";
import Reminder from "./Reminder";
import getDateWithOffset, { getCustomFormatDateString } from "../date/getDate";
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
  const [dueSelectedDate, setDueSelectedDate] = useState(new Date());

  const [remindButtonText, setRemindButtonText] = useState("Remind");
  const [showRemindRemoveButton, setShowRemindRemoveButton] = useState(false);
  const [remindSelectedTime, setRemindSelectedTime] = useState(new Date());

  const duePopoverRef = useRef(null);
  const dueTooltipRef = useRef(null);
  const dueCalendarRef = useRef(null);
  const remindPopoverRef = useRef(null);
  const remindTooltipRef = useRef(null);
  const remindCalendarRef = useRef(null)

  const taskInputHandler = (event) => {
    // TODO: task만 다루고, 나머지는 등록할때 추가하기
    const createdTime = getDateWithOffset(); // date
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
    setDueButtonText(getCustomFormatDateString(dueSelectedDate));
    setTaskInput((prevState) => ({
      ...prevState,
      dueDate: dueSelectedDate,
    }));
  };

  const remindCalendarHandler = () => {
    console.log(remindSelectedTime)
    setRemindButtonText(getCustomFormatDateString(remindSelectedTime));
    setTaskInput((prevState) => ({
      ...prevState,
      remind: remindSelectedTime,
    }));
  };

  const dueDateHandler = (dueDate) => {
    setDueButtonText(dueDate.text);
    setTaskInput((prevState) => ({
      ...prevState,
      dueDate: dueDate.date,
    }));
  };

  const remindHandler = (remind) => {
    // remind는 date object
    setRemindButtonText(remind.text);
    setTaskInput((prevState) => ({
      ...prevState,
      remind: remind.time,
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

  const resetRemindHandler = () => {
    setTaskInput((prevState) => ({
      ...prevState,
      remind: "",
    }));
    setRemindButtonText("Remind");
    setShowRemindRemoveButton(false);
  };

  useEffect(() => {
    // remove button 생성
    if (taskInput.dueDate) {
      setShowDueRemoveButton(true);
    }

    if (taskInput.remind) {
      setShowRemindRemoveButton(true);
    }
  }, [taskInput]);

  const showCalendarHandler = (type) => {
    if (type === "due") {
      const calendar = document.getElementById("dueCalendar");
      if (calendar) {
        calendar.click();
      }
    }

    if (type === "remind") {
      const calendar = document.getElementById("remindCalendar");
      if (calendar) {
        calendar.click();
      }
      console.log("remind calendar open");
    }
  };

  const closePopoverHandler = () => {
    duePopoverRef.current.setVisibility(false);
    remindPopoverRef.current.setVisibility(false);
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
              id="dueCalendar"
              ref={dueCalendarRef}
              selected={dueSelectedDate}
              onChange={(date) => setDueSelectedDate(date)}
              shouldCloseOnSelect={false}
              customInput={<span></span>}
              showPopperArrow={false}
            >
              <div>
                <button
                  onClick={() => {
                    dueCalendarRef.current.setOpen(false);
                    dueDateCalendarHandler();
                  }}
                >
                  Save
                </button>
              </div>
            </DatePicker>
          </div>

          <div>
            <button id="remind">{remindButtonText}</button>
            <Popper
              initOpen={false}
              ref={remindPopoverRef}
              placement="bottom"
              target="remind"
              toggle="legacy"
            >
              <Reminder
                onAddRemind={remindHandler} // 완료
                onClosePopover={closePopoverHandler} // 완료
                showRemoveButton={showRemindRemoveButton}
                resetRemind={resetRemindHandler}
                showCalendar={showCalendarHandler}
              />
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
            <DatePicker
              id="remindCalendar"
              ref={remindCalendarRef}
              selected={dueSelectedDate}
              onChange={(date) => setRemindSelectedTime(date)}
              // showTimeSelect
              // timeIntervals={15}
              shouldCloseOnSelect={false}
              customInput={<span></span>}
              showPopperArrow={false}
            >
              <div>
                
                <button
                  onClick={() => {
                    remindCalendarRef.current.setOpen(false);
                    remindCalendarHandler();
                  }}
                >
                  Save
                </button>
              </div>
            </DatePicker>
          </div>
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
 * 지난날짜 선택했을 때, overdue 표시
 *
 *
 *
 *
 */
