import { useState } from "react";
import TaskItem from "../TaskItem";
import TaskItemHeader from "../TaskItemHeader";
import { useSelector } from "react-redux";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

const SearchedTasks = ({ todoArr }) => {
  const [isOpen, setIsOpen] = useState(true);
  const activeTasksId = useSelector((state) => state.active.activeTasks);

  const { lastTaskRef, limitTodoArr } = useInfiniteScroll(20, todoArr);

  const openHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const count = todoArr.length;

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
            title="Tasks"
            isOpen={isOpen}
            openHandler={openHandler}
            count={count}
          />
          {isOpen && <div>{content}</div>}
        </div>
      )}
    </>
  );
};

export default SearchedTasks;
