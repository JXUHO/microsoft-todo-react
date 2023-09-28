import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const MydayList = () => {
  const todos = useSelector((state) => state.todo.todos);
  return (
    <>
      {/* <div>
        {todos.map((todo) => (
          <TaskItem key={todo.id} todo={todo} />
        ))}
      </div> */}
      <div>
        {todos.map((todo) => {
          if (todo.myday) {
            return <TaskItem key={todo.id} todo={todo} />;
          }
        })}
      </div>
    </>
  );
};

export default MydayList;

/**
 * TODO
 * props로 옵션 받아와서, 해당 옵션이 true인것만 map해서 출력하기
 * completed탭이나 earlier탭 고려하기
 *
 */
