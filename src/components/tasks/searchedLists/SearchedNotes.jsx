import { useState } from "react";
import TaskItem from "../TaskItem";
import TaskItemHeader from "../TaskItemHeader";

const SearchedNotes = ({ todoArr }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const count = todoArr.length;

  return (
    <>
      {count !== 0 && (
        <div className="px-6">
          <TaskItemHeader
            title="Notes"
            isOpen={isOpen}
            openHandler={openHandler}
            count={count}
          />
          {isOpen && (
            <div>
              {todoArr.slice().map((todo) => (
                <TaskItem key={todo.id} todo={todo} currentLocation="search" />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchedNotes;
