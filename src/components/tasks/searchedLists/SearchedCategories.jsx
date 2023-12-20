import { useCallback, useRef, useState } from "react";
import TaskItem from "../TaskItem";
import TaskItemHeader from "../TaskItemHeader";
import { useSelector } from "react-redux";

const SearchedCategories = ({ todoArr }) => {
  const [isOpen, setIsOpen] = useState(true);
  const activeTasksId = useSelector((state) => state.active.activeTasks);
  const [tasksToShow, setTasksToShow] = useState(20);

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

  const openHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const count = todoArr.length;
  const limitTodoArr = todoArr.slice(0, tasksToShow);

  const content = limitTodoArr.map((todo, index) => {
    if (limitTodoArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation="search"
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation="search"
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  return (
    <>
      {count !== 0 && (
        <div className="px-6">
          <TaskItemHeader
            title="Categories"
            isOpen={isOpen}
            openHandler={openHandler}
            count={count}
          />
          {isOpen && (
            <div>
              {content}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchedCategories;
