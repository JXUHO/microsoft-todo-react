import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import sortTasks from "../../utils/sortTasks";
import TaskItemHeader from "./TaskItemHeader";

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
      <TaskItemHeader
        title="Completed"
        isOpen={isCompleteOpen}
        openHandler={toggleCompleteHandler}
        count={completeCount}
      />
      {isCompleteOpen && (
        <div>
          {todoArr.slice().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>
          ))}
        </div>
      )}
    </>
  );
};

export default CompleteList;
