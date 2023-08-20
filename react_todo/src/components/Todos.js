import { useSelector } from "react-redux";

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos)
  return (
    <div>
      {todos.map(todo => <div>{todo}</div>)}
    </div>
  )
}

export default Todos;

/**
 * TODO
 * remove todo if clicked -> move todo to Completed list
 * TODO -> object: {date, remind, repeat, finish}
 * 
 * 
 */