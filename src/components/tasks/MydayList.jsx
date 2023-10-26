import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sortTasks from "../../utils/sortTasks";
import GroupLists from "./GroupLists";
import BasicList from "./BasicList";
import CompleteList from "./CompleteList";
import { addActiveTasks } from "../../store/activeSlice";

const MydayList = ({ currentLocation }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [todoArr, setTodoArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.myday.order);
  const sortBy = useSelector((state) => state.sort.myday.sortBy);
  const groupBy = useSelector((state) => state.group.myday.groupBy);
  const activeRange = useSelector((state) => state.active.activeRange);

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

  useEffect(() => {
    // 정렬된 task를 shift keydown activeRange에 따라 active 설정
    if (activeRange.length !== 0) {
      const [startId, endId] = activeRange.map((taskId) =>
        todoArr.findIndex((todo) => todo.id === taskId)
      );
      if (startId !== -1 && endId !== -1) {
        const [minIndex, maxIndex] = [startId, endId].sort((a, b) => a - b);
        const activeTasksArr = todoArr.slice(minIndex, maxIndex + 1);

        activeTasksArr.forEach((task) => {
          dispatch(addActiveTasks(task.id));
        });
      }
    }
  }, [activeRange, todoArr, dispatch]);

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
 *
 *  // TODO
  // redux에 Boolean state 정의하고, TaskItem taskClickHandler내부에서 shift keydown일때 Boolean state true로 변경함
  // useEffect 정의하고, 내부에서 Boolean state true일 경우에, 선택된 양 끝점을 todoArr의 순서에 따라 activeTasks에 추가함
  // 이후 Boolean state를 false로 변경.
 */

// if (activeRange.length !== 0) {
//   let activeTasksArr = [];
//   const indexA = todoArr.indexOf(
//     todoArr.find((todo) => todo.id === activeRange[0])
//   );
//   const indexB = todoArr.indexOf(
//     todoArr.find((todo) => todo.id === activeRange[1])
//   );

//   if (indexA < indexB) {
//     activeTasksArr = todoArr.slice(indexA, indexB + 1);
//   } else {
//     activeTasksArr = todoArr.slice(indexB, indexA + 1);
//   }

//   activeTasksArr.forEach((task) => {
//     dispatch(addActiveTasks(task.id));
//   });
// }
