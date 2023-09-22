import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodos } from "../../store/todoSlice";
import uuid from "react-uuid";
import classes from "./AddTask.module.css";
import DuePopover from "./DuePopover";
import RemindPopover from "./RemindPopover";
import RepeatPopover from "./RepeatPopover";
import getLastTimeOfDay, { getCustomFormatDateString, getDayOfWeek, getNextClosestDayOfWeekFromDate, getNextDayOfWeekFromDate, getNextRepeatDateOfWeek, getNextRepeatWeek } from "../date/getDates";

const initialTask = {
  id: "", // uuid
  task: "", // user input
  steps: {},
  myday: false,
  tasks: false,
  dueDate: "", // isoString
  remind: "", // isoString
  repeatRule: "",
  repeated: false,
  category: "",
  file: null, // db 주소?
  note: "",
  importance: false,
  created: "",
  complete: false,
};

const AddTask = (props) => {
  const dispatch = useDispatch();
  const tasksStored = useSelector((state) => state.todo.todos);
  const [taskInput, setTaskInput] = useState(initialTask);
  const dueRef = useRef();
  const remindRef = useRef();
  const repeatRef = useRef();

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
    dueRef.current.resetDue();
    remindRef.current.resetRemind();
    repeatRef.current.resetRepeat();
  };

  const addTaskHandler = () => {
    dispatch(addTodo(taskInput)); // redux에 todo 등록
    setTaskInput(initialTask); // input state 초기화
    initializeButtons();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
  };

  const taskCreateValueHandler = (input, type) => {
    if (input instanceof Date) {
      input = input.toISOString();
    }
    setTaskInput((prevState) => ({
      ...prevState,
      [type]: input,
    }));
  };

  useEffect(() => {  // due 제거되면 repeat도 제거
    if (!taskInput.dueDate && taskInput.repeatRule) {
      repeatRef.current.resetRepeat();
    }
  }, [taskInput.dueDate]);

  useEffect(() => {  // repeat설정했을때, due버튼 설정
    if (taskInput.repeatRule && !taskInput.dueDate) {
      if (taskInput.repeatRule.split("-").length === 2) {
        dueRef.current.setDue(getLastTimeOfDay());
      } else {
        const today = new Date()
        dueRef.current.setDue(getNextClosestDayOfWeekFromDate(today, taskInput.repeatRule.split("-").slice(2)))
      }
    } 
  }, [taskInput.repeatRule]);


  useEffect(() => {
    // 등록 후 repeat관리
    // complete된 경우 repeat이 true인 항목을 false로 업데이트하고, 다음 repeat 기간의 repeat true인 task를 추가하고
    // todos배열을 통째로 dispatch해서 기존의 항목과 대체.
    // complete됐다가 complete state가 다시 false로 변하는 경우 고려할것.

    let updatedTasks = [];

    tasksStored.forEach((taskItem) => {
      if (taskItem.repeatRule && taskItem.complete && !taskItem.repeated) {  // repeat 등록된 task가 완료됐을 때
        // rule에 이번주 남은 요일이 있다면, 해당 요일에 해당하는 date를 전달
        // rule에 이번주 남은 요일이 없다면, interval 적용
        let nextRepeatDate;
        if (taskItem.repeatRule.split("-")[1] === "week") {
          nextRepeatDate = getNextRepeatWeek(taskItem.repeatRule, new Date(taskItem.dueDate))  // week 뒤에 옵션 붙은경우
        }
        if (taskItem.repeatRule.split("-")[1] === "day") {}
        if (taskItem.repeatRule.split("-")[1] === "month") {}
        if (taskItem.repeatRule.split("-")[1] === "year") {}

        const nextRepeatTask = {
          ...taskItem,
          complete: false,
          dueDate: nextRepeatDate.toISOString(),
        };
        taskItem.repeated = true;
        updatedTasks.push(nextRepeatTask);
      }

      updatedTasks.push(taskItem);
    });

    // // infinite loop 주의해야함. 조건문 내부에 넣을것. flag를 설정해서 dispatch 이후로 false로 변경, addTaskHandler에서 true로 변경
    // if (flag) {
    //   dispatch(updateTodos(updatedTasks));
    //   flag = false
    // }
  }, [tasksStored]);

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
          <DuePopover
            setDueDateValue={taskCreateValueHandler}
            dueDateValue={taskInput.dueDate}
            ref={dueRef}
          />
          <RemindPopover
            setRemindValue={taskCreateValueHandler}
            remindValue={taskInput.remind}
            ref={remindRef}
          />
          <RepeatPopover
            setRepeatRule={taskCreateValueHandler}
            ref={repeatRef}
          />
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
 * Repeat popover 만들기 -> repeat 설정하고 완료됐을 때, 해당 반복 시간에 imperative하게 task 생성해야함(ongoing)
 *
 * TODO - 22일에 해야할것.
 * 현재 useEffect에 store의 todos배열을 가지고와서,
 * 어떤 task의 repeat이 true이고, complete도 true이면 -> repeat을 false로 바꾸고 return.
 *    해당 task의 값을 그대로 가지고와서 새로운 task를 생성한다
 *      repeat을 true, complete을 false, repeatRule에 따라 다음 dueDate를 설정하고 이 task를 updatedTasks에 push해야 한다
 *
 * 정리하자면,
 * 1. repeatRule에 따라 다음 dueDate를 계산해야 한다.
 * 2. updatedTasks를 dispatch할때, infinite loop에 빠지지 않도록 flag를 설정하거나, 또다른 조건을 설정해야 한다
 * 3. custom component를 구현해야 한다.
 * 4. myday에서 dueDate가 오늘이거나, myday에서 생성된 task를 taskList에 출력하도록 조정해야 한다
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 현재 시간에 따라서 duedate에 myday true로 변경  / 날짜 바뀌면 mytask false로 변경  / repeat완료되면 다음 task생성 /
 *
 * remind는 alarm으로 구현해보기.
 *
 *
 *
 *
 *
 * calendar에서 저장없이 나갔을때 오늘로 초기화(보류)
 */
