import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import sortTasks from "../../utils/sortTasks";

const CompleteList = ({ currentLocation }) => {
  const todos = useSelector((state) => state.todo.todos);
  const sortOrder = useSelector((state) => state.sort.myday.order);
  const sortBy = useSelector((state) => state.sort.myday.sortBy);
  const [isCompleteOpen, setIsCompleteOpen] = useState(true);
  const [todoArr, setTodoArr] = useState([]);

  const toggleCompleteHandler = () => {
    setIsCompleteOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // myday, complete, sortBy 순서대로 적용해야함
    let todoTemp = todos.slice().reverse();

    todoTemp = todoTemp.filter((todo) => todo.complete);

    // myday check
    if (currentLocation === "myday") {
      todoTemp = todoTemp.filter((todo) => todo.myday);
    }

    // sort옵션 적용
    if (sortBy) {
      setTodoArr(sortTasks(sortBy, sortOrder, todoTemp));
    } else {
      setTodoArr(todoTemp);
    }
  }, [todos, sortBy, sortOrder]);

  const completeCount = todoArr.reduce(
    (acc, todo) => (todo.complete ? acc + 1 : acc),
    0
  );

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
      {isCompleteOpen && (
        <div>
          {todoArr.slice().map((todo) => (
            <TaskItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default CompleteList;
