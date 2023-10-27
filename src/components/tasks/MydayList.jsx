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
    let mydayTodos = todos
      .slice()
      .reverse()
      .filter((todo) => todo.myday);

    if (sortBy) {
      mydayTodos = sortTasks(sortBy, sortOrder, mydayTodos)
    } 

    let incompleteTemp = []
    let completeTemp = []
    mydayTodos.forEach(todo => {
      if (!todo.complete) {
        incompleteTemp.push(todo)
      } else {
        completeTemp.push(todo)
      }
    })
    mydayTodos = [...incompleteTemp, ...completeTemp]
    setTodoArr(mydayTodos)

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
        <CompleteList todoArr={todoArr} currentLocation={currentLocation} />
      </div>
    </>
  );
};

export default MydayList;

/**
 * TODO
 * drag-drop을 통해 task끼리 순서 변경 가능함
 *
 */
