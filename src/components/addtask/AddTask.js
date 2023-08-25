import { useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";
import TaskButton from "./TaskButton";
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

  return (
    <div className={classes.addTaskBar}>
      <div>
        <input
          placeholder="Add a task"
          onChange={taskInputHandler}
          value={taskInput.task}
        />
      </div>
      <div className={classes.taskBar}>
        <div className={classes.taskButtons}>
          <TaskButton event={"dueDate"} />
          <TaskButton event={"remind"} />
          <TaskButton event={"repeat"} />
        </div>
        <button disabled={!taskInput.task} onClick={addTaskHandler}>
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

// const mouseOverHandler = (event) => {
//   setIsFocused((prevState) => ({ ...prevState, [event]: true }));
// };
// const mouseLeaveHandler = (event) => {
//   setIsFocused((prevState) => ({ ...prevState, [event]: false }));
// };
/* <button onMouseOver={() => mouseOverHandler("dueDate")} onMouseLeave={() => mouseLeaveHandler("dueDate")} onClick={null}>Add due date</button>
        {isFocused.dueDate && <p>Add due date</p>}
        <button onMouseOver={() => mouseOverHandler("remind")} onMouseLeave={() => mouseLeaveHandler("remind")} onClick={null}>Remind me</button>
        {isFocused.remind && <p>Remind me</p>}
        <button onMouseOver={() => mouseOverHandler("repeat")} onMouseLeave={() => mouseLeaveHandler("repeat")} onClick={null}>Repeat</button>
        {isFocused.repeat && <p>Repeat</p>} */
