import { useDispatch, useSelector } from "react-redux";
import React, {  useEffect, useState } from "react";
import sortTasks from "../../utils/sortTasks";
import TaskItem from "./TaskItem";
import { addActiveTasks } from "../../store/activeSlice";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const ImportantList = ({ currentLocation }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [todoArr, setTodoArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.important.order);
  const sortBy = useSelector((state) => state.sort.important.sortBy);
  const activeRange = useSelector((state) => state.active.activeRange);
  const activeTasksId = useSelector((state) => state.active.activeTasks);

  useEffect(() => {
    //  todoArr 생성.
    if (sortBy) {
      setTodoArr(sortTasks(sortBy, sortOrder, todos));
    } else {
      setTodoArr(todos);
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
  }, [activeRange]);


  const importanceTodoArr = todoArr.filter((task) => !task.complete && task.importance);

  const { lastTaskRef, limitTodoArr } =
  useInfiniteScroll(20, importanceTodoArr);

  const content = limitTodoArr.map((todo, index) => {
    if (limitTodoArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });


  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-6 px-6">
        {content}
      </div>
    </>
  );
};

export default React.memo(ImportantList);