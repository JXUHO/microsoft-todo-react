import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import TaskItem from "./TaskItem";

const CompleteList = ({ todoArr }) => {
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const toggleCompleteHandler = () => {
    setIsCompleteOpen((prevState) => !prevState);
  };

  const completeCount = todoArr.reduce((acc, todo) => {
    if (todo.complete) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <>
      <div
        className="flex items-center min-h-52 cursor-pointer"
        style={isCompleteOpen ? null : { boxShadow: "0 17px 0 -16px #e1dfdd" }}
        onClick={toggleCompleteHandler}
      >
        <div className="flex items-center justify-center w-8 h-8 cursor-pointer">
          <div>
            <BsChevronRight
              className="mt-1 ml-1"
              style={{
                color: "#797775",
                transform: isCompleteOpen ? "rotate(90deg)" : "rotate(0)",
                transition: "all 0.1s linear",
              }}
            />
          </div>
        </div>
        <div className="flex p-2">
          <h3 className="font-medium">Completed</h3>
          <h3 className="ml-2" style={{ color: "#797775" }}>
            {completeCount}
          </h3>
        </div>
      </div>
      {isCompleteOpen && ( // 기본 sort는 complete 시간 내림차순 + importance우선
        <div>
          {todoArr.slice().map((todo) => {
            if (todo.complete) {
              return <TaskItem key={todo.id} todo={todo} />;
            }
          })}
        </div>
      )}
    </>
  );
};

export default CompleteList;
