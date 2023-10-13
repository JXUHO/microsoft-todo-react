import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import DuePopover from "./DuePopover";
import RemindPopover from "./RemindPopover";
import RepeatPopover from "./RepeatPopover";
import getLastTimeOfDay, {
  getNextClosestDayOfWeekFromDate,
} from "../../utils/getDates";
import { GoCircle } from "react-icons/go";

const initialTask = {
  id: "", // uuid
  task: "", // user input
  steps: [],
  myday: false,
  dueDate: "", // isoString
  remind: "", // isoString
  repeatRule: "",
  repeated: false,
  category: [],
  file: null, // db 주소?
  note: {content:"", updated:""},
  importance: false,
  created: "", // isoString
  complete: "", // isoString
};

const AddTask = ({ isMyday }) => {
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
      myday: isMyday,
    }));
  };

  const initializeButtons = () => {
    dueRef.current.resetDue();
    remindRef.current.resetRemind();
    repeatRef.current.resetRepeat();
  };

  const addTaskHandler = () => {
    const trimmedTaskInput = {...taskInput, task: taskInput.task.trim()}
    dispatch(addTodo(trimmedTaskInput));
    setTaskInput(initialTask); 
    initializeButtons();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
    if (event.key === "Escape") {
      setTaskInput(initialTask)
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
    <div
      className="flex flex-col overflow-hidden rounded bg-white"
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="flex items-center min-h-[52px] bg-white px-4 w-full"
        style={{ borderBottom: "1px solid #e1dfdd" }}
      >
        <div className="ml-2 cursor-pointer">
          <GoCircle color="#2564cf" size="18px" />
        </div>
        <input
          className="px-4 placeholder:text-ms-blue focus:placeholder:text-gray-500"
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
          }}
          placeholder="Add a task"
          onChange={taskInputHandler}
          value={taskInput.task}
          onKeyDown={handleEnterKeyPress}
        />
      </div>

      <div className="flex justify-between h-11 items-center bg-ms-background shrink-0 px-4" style={{color: '#323130'}}>
        <div className="flex items-center justify-center">
          <div className="flex px-1">
            <DuePopover
              setDueDateValue={taskCreateValueHandler}
              dueDateValue={taskInput.dueDate}
              ref={dueRef}
            />
          </div>
          <div className="flex px-1">
            <RemindPopover
              setRemindValue={taskCreateValueHandler}
              remindValue={taskInput.remind}
              ref={remindRef}
            />
          </div>
          <div className="flex px-1">
            <RepeatPopover
              setRepeatRule={taskCreateValueHandler}
              repeatRuleValue={taskInput.repeatRule}
              ref={repeatRef}
            />
          </div>
        </div>

        <button
          className="h-8 border-solid px-2 text-xs font-medium text-ms-blue bg-white disabled:cursor-not-allowed disabled:text-gray-400"
          style={{borderWidth: '1px'}}
          disabled={!taskInput.task.trim()}
          onClick={addTaskHandler}
        >
          Add
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
