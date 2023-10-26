import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sortTasks from "../../utils/sortTasks";
import GroupLists from "./GroupLists";
import BasicList from "./BasicList";
import CompleteList from "./CompleteList";

const MydayList = ({ currentLocation }) => {
  const todos = useSelector((state) => state.todo.todos);
  const [todoArr, setTodoArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.myday.order);
  const sortBy = useSelector((state) => state.sort.myday.sortBy);
  const groupBy = useSelector((state) => state.group.myday.groupBy);

  useEffect(() => {
    //  todoArr 생성.
    const mydayTodos = todos
      .slice()
      .reverse()
      .filter((todo) => todo.myday);

    if (sortBy) {
      setTodoArr(sortTasks(sortBy, sortOrder, mydayTodos));
    } else {
      setTodoArr(mydayTodos);
    }
  }, [todos, sortBy, sortOrder]);

  // TODO
  // redux에 Boolean state 정의하고, TaskItem taskClickHandler내부에서 shift keydown일때 Boolean state true로 변경함
  // useEffect 정의하고, 내부에서 Boolean state true일 경우에, 선택된 양 끝점을 todoArr의 순서에 따라 activeTasks에 추가함
  // 이후 Boolean state를 false로 변경.


  return (
    <>
      <div className="overflow-y-auto">
        {groupBy === "category" ? (
          <GroupLists todoArr={todoArr} currentLocation={currentLocation} />
        ) : (
          <BasicList todoArr={todoArr} currentLocation={currentLocation} />
        )}
        <CompleteList currentLocation={currentLocation} />
      </div>
    </>
  );
};

export default MydayList;

/**
 * TODO
 * drag-drop을 통해 task끼리 순서 변경 가능함
 * complete탭에서 importance버튼이 눌리면 상단으로 이동함
 *
 *
 *
 */
