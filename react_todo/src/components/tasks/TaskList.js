import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const incompletedTodos = todos.filter(todo => !todo.completed)
  return (
    <div>
      {incompletedTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo}/>
      ))}
    </div>

  );
};

export default TaskList;

