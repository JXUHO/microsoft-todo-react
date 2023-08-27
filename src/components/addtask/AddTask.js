import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import TaskButtons from "./TaskButtons";
import classes from "./AddTask.module.css";

const initialTask = {
  id: "",
  task: "",
  steps: {},
  myday: false,
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
    const createdTime = new Date().getDate();

    setTaskInput({
      ...taskInput,
      task: event.target.value,
      created: createdTime,
      id: uuid(),
      myday: props.myday,
    });
  };

  const addTaskHandler = () => {
    dispatch(addTodo(taskInput));
    setTaskInput(initialTask);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && taskInput.task.trim()) {
      addTaskHandler();
    }
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
          <TaskButtons />
        </div>
        <button disabled={!taskInput.task.trim()} onClick={addTaskHandler} >
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
 */
