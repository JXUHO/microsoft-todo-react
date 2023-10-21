import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sortTasks from "../../utils/sortTasks";
import TaskItem from "./TaskItem";


const ImportantList = ({currentLocation}) => {
  const todos = useSelector((state) => state.todo.todos);
  const [todoArr, setTodoArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.important.order);
  const sortBy = useSelector((state) => state.sort.important.sortBy);

  useEffect(() => {
    //  todoArr 생성.
    if (sortBy) {
      setTodoArr(sortTasks(sortBy, sortOrder, todos));
    } else {
      setTodoArr(todos);
    }
  }, [todos, sortBy, sortOrder]);

  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-6 px-6">
        {todoArr.slice().map((todo) => {
          if (todo.importance && !todo.complete) {
            return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
          }
        })}
      </div>
    </>
  );
};

export default ImportantList;

/**
 * TODO
 *
 * Complete탭은 별도로 추가된 순서에 따라 정렬함. todoSlice의 completeTodo에서 complete되면 완료된 시간을 isoString으로 추가하고,
 * complete가 비활성화되면 시간을 삭제한다. 이에 따라서 정렬 로직 생성할것
 *
 *
 *
 *
 *
 *
 * drag-drop을 통해 task끼리 순서 변경 가능함
 * complete탭에서 importance버튼이 눌리면 상단으로 이동함
 *
 *
 *
 */
