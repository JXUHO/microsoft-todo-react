import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import classes from "./AddTask.module.css";
import DuePopover from "./DuePopover";
import RemindPopover from "./RemindPopover";
import RepeatPopover from "./RepeatPopover";
import getLastTimeOfDay, {
  getNextClosestDayOfWeekFromDate,
} from "../date/getDates";

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

  useEffect(() => {
    // due 제거되면 repeat도 제거
    if (!taskInput.dueDate && taskInput.repeatRule) {
      repeatRef.current.resetRepeat();
    }
  }, [taskInput.dueDate]);

  useEffect(() => {
    // repeat설정했을때, due버튼 설정
    if (taskInput.repeatRule && !taskInput.dueDate) {
      if (taskInput.repeatRule.split("-").length === 2) {
        dueRef.current.setDue(getLastTimeOfDay());
      } else {
        const today = new Date();
        dueRef.current.setDue(
          getNextClosestDayOfWeekFromDate(
            today,
            taskInput.repeatRule.split("-").slice(2)
          )
        );
      }
    }
  }, [taskInput.repeatRule]);

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
            repeatValue={taskInput.repeatRule}
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
 * custom component를 구현해야 한다.
 * myday에서 dueDate가 오늘이거나, myday에서 생성된 task를 taskList에 출력하도록 조정해야 한다
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
