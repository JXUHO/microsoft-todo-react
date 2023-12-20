import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import sortTasks from "../../utils/sortTasks";
import GroupLists from "./GroupLists";
import BasicList from "./BasicList";
import CompleteList from "./CompleteList";
import { addActiveTasks } from "../../store/activeSlice";

const MydayList = ({ currentLocation }) => {
  const dispatch = useDispatch();
  const [todoArr, setTodoArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.myday.order);
  const sortBy = useSelector((state) => state.sort.myday.sortBy);
  const groupBy = useSelector((state) => state.group.myday.groupBy);
  const activeRange = useSelector((state) => state.active.activeRange);
  const todos = useSelector((state) => state.todo.todos);

  // useGetTodos();

  useEffect(() => {
    // importance Boolean에서 Date Object string으로 변경함
    // importanct 설정되면 상단으로 render하는 logic을 여기에 작성해야 함
  
    // console.log('mydaylist useEffect');
    // console.log(todos);

    let mydayTodos;

    // user exist
    mydayTodos = todos
      .slice()
      .sort((a, b) => new Date(a.created) - new Date(b.created))
      .reverse()
      .filter((todo) => todo.myday);

    if (sortBy) {
      mydayTodos = sortTasks(sortBy, sortOrder, mydayTodos);
    }

    let incompleteTemp = [];
    let completeTemp = [];
    mydayTodos.forEach((todo) => {
      if (!todo.complete) {
        incompleteTemp.push(todo);
      } else {
        completeTemp.push(todo);
      }
    });
    mydayTodos = [...incompleteTemp, ...completeTemp];
    setTodoArr(mydayTodos);

    
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

export default React.memo(MydayList);
