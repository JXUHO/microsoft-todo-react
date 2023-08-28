import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import TaskButtons from "./TaskButtons";
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

    const createdTime = getDateString();

    setTaskInput((prevState) => ({
      ...prevState,
      task: event.target.value,
      created: createdTime,
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

  const addDetailHandler = (input) => {
    setTaskInput((prevState) => ({ ...prevState, ...input }));
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
          <TaskButtons onAddDetail={addDetailHandler} />
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
 * from taskInputHandler, handle only task(efficiency)
 * handle other data at addTaskHandler BUT dispatch & setState together have async & sync matter
 *
 * taskInputHandler에서 user input 다른 정보 분리하기, user input이외의 정보들은 addTaskHandler에서 추가하기
 * 
 * 
 */
