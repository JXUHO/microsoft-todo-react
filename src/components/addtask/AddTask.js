import { useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import uuid from "react-uuid";

const initialTask = {id: "", task: "", myday: false, date:{}, repeat:"", remind:"", category:"", file: null, note:"", importance: false, created: {}, completed: false}

const AddTask = (props) => {
  const dispatch = useDispatch()
  const [taskInput, setTaskInput] = useState(initialTask);


  const taskInputHandler = (event) => {
    const createdTime = new Date().getDate()

    setTaskInput({...taskInput, task: event.target.value, created: createdTime, id: uuid(), myday: props.myday})
  };


  const addTaskHandler = () => {
    dispatch(addTodo(taskInput))
    setTaskInput(initialTask);
  };


  return (
    <div>
      <div>
        <input
          placeholder="Add a task"
          onChange={taskInputHandler}
          value={taskInput.task}
        />
      </div>
      <div>
        <button>Add due date</button>
        <button>Remind me</button>
        <button>Repeat</button>
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