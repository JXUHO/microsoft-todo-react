import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import sortTasks from "../../utils/sortTasks";
import TaskItemHeader from "./TaskItemHeader";

const CompleteList = ({ currentLocation }) => {
  const todos = useSelector((state) => state.todo.todos);
  const sortOrder = useSelector((state) => state.sort[currentLocation].order);
  const sortBy = useSelector((state) => state.sort[currentLocation].sortBy);
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

  const title = currentLocation === "completed" ? "Tasks" : "Completed";

  return (
    <>
      {todoArr.some((todo) => todo.complete) && (
        <div className="flex flex-col overflow-y-auto pb-6 px-6">
          <TaskItemHeader
            title={title}
            isOpen={isCompleteOpen}
            openHandler={toggleCompleteHandler}
            count={completeCount}
          />

          {isCompleteOpen && (
            <div>
              {todoArr.slice().map((todo) => (
                <TaskItem
                  key={todo.id}
                  todo={todo}
                  currentLocation={currentLocation}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CompleteList;
