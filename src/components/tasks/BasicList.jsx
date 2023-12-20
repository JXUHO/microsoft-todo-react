import React, { useCallback, useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

const BasicList = ({ todoArr, currentLocation }) => {
  const [tasksToShow, setTasksToShow] = useState(20);
  const activeTasksId = useSelector((state) => state.active.activeTasks);

  const loadMoreTasks = () => {
    setTasksToShow((prevState) => prevState + 20);
  };

  const observerRef = useRef();

  const lastTaskRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && tasksToShow <= todoArr.length) {
          console.log("load more");
          loadMoreTasks();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [tasksToShow, todoArr.length]
  );

  const incompleteTodoArr = todoArr.filter((task) => !task.complete);
  const limitTodoArr = incompleteTodoArr.slice(0, tasksToShow);

  console.log("basic list");


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

  const noIncomplete = todoArr.every((todo) => todo.complete === "");

  return (
    <div
      className="flex flex-col px-6"
      style={
        noIncomplete ? { paddingBottom: "1.5rem" } : { paddingBottom: "5px" }
      }
    >
      {content}
    </div>
  );
};

export default React.memo(BasicList);

// useEffect(() => {
//   console.log(incompleteTodoArr.length);
//   // Check if all tasks are rendered
//   // if (limitTodoArr.length === incompleteTodoArr.length) {
//     if(tasksToShow >= todoArr.length) {
//     console.log("limit", limitTodoArr.length);
//     console.log("incomplete", incompleteTodoArr.length);
//     console.log("completed render");
//   }
// }, [limitTodoArr, incompleteTodoArr]);
