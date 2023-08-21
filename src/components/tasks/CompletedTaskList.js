import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const CompletedTaskList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const completedTodos = todos.filter(todo => todo.completed)
  return (
    <div>
      {completedTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo}/>
      ))}
    </div>

  );
};

export default CompletedTaskList;
