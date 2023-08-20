import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/todoSlice";

const AddTask = () => {
  const dispatch = useDispatch()
  // const todos = useSelector((state) => state.todo.todos)
  const [taskInput, setTaskInput] = useState("");

  const taskInputHandler = (event) => {
    setTaskInput(event.target.value);
  };

  const addTaskHandler = () => {
    // add task to database
    dispatch(addTodo(taskInput))  // Add {date, repeat, remind, id} into addtodo payload
    setTaskInput("");
  };


  return (
    <div>
      <div>
        <input
          placeholder="Add a task"
          onChange={taskInputHandler}
          value={taskInput}
        />
      </div>
      <div>
        <button>Add due date</button>
        <button>Remind me</button>
        <button>Repeat</button>
        <button disabled={!taskInput} onClick={addTaskHandler}>
          add
        </button>
      </div>
    </div>
  );
};

export default AddTask;
