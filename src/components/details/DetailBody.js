import { useSelector } from "react-redux";

const DetailBody= (props) => {
  const todos = useSelector(state => state.todo.todos);
  const todoDetail = todos.find(todo => todo.id === props.id)

  return (
    <>
      <ul>
        <li>
          {todoDetail.task}
        </li>
      </ul>
    </>
  )
}


export default DetailBody;