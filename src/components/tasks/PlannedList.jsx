import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeDueDateTodo,
  repeatedTodo,
} from "../../store/todoSlice";
import repeatTask from "../../utils/repeatTask";
import { useEffect, useState } from "react";
import TaskItemHeader from "./TaskItemHeader";
import TaskItem from "./TaskItem";

const PlannedList = () => {
  const todoArr = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({
    earlier: false,
    today: true,
    tomorrow: true,
    next5Days: true,
    later: true,
  });
  const [sortedArr, setSortedArr] = useState({
    earlier: [],
    today: [],
    tomorrow: [],
    next5Days: [],
    later: [],
  });
  const [count, setCount] = useState({
    earlier: 0,
    today: 0,
    tomorrow: 0,
    next5Days: 0,
    later: 0,
  });

  const toggleListHandler = (title) => {
    setIsOpen((prevState) => {
      return {
        ...prevState,
        [title]: !prevState[title],
      };
    });
  };

  useEffect(() => {
    const listCount = {
      earlier: 0,
      today: 0,
      tomorrow: 0,
      next5Days: 0,
      later: 0,
    };
    const tempSortedArr = {
      earlier: [],
      today: [],
      tomorrow: [],
      next5Days: [],
      later: [],
    };
    todoArr.forEach((todo) => {
      if (!todo.dueDate || todo.complete) return;
      const category = classifyDate(todo);
      tempSortedArr[category].push(todo);
      listCount[category]++;
    });

    setSortedArr(tempSortedArr);
    setCount(listCount);
  }, [todoArr]);

  useEffect(() => {
    // repeat완료됐을때 새로운 task생성 & due와 repeat어긋났을때 due 수정
    todoArr.map((todo) => {
      const repeatInfo = repeatTask(todo);
      if (!repeatInfo) return;
      if (repeatInfo instanceof Date) {
        dispatch(
          changeDueDateTodo({ id: todo.id, dueDate: repeatInfo.toISOString() })
        );
      } else {
        dispatch(repeatedTodo(todo.id));
        dispatch(addTodo(repeatInfo));
      }
    });
  }, [todoArr, dispatch]);


  return (
    <div className="flex flex-col overflow-y-auto pb-6 px-6">
      {count.earlier !== 0 && (
        <TaskItemHeader
          title="Earlier"
          isOpen={isOpen.earlier}
          openHandler={() => toggleListHandler("earlier")}
          count={count.earlier}
        />
      )}
      {count.earlier !== 0 && isOpen.earlier && (
        <div>
          {sortedArr.earlier.slice().reverse().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation="planned" />
          ))}
        </div>
      )}

      {count.today !== 0 && (
        <TaskItemHeader
          title="Today"
          isOpen={isOpen.today}
          openHandler={() => toggleListHandler("today")}
          count={count.today}
        />
      )}
      {count.today !== 0 && isOpen.today && (
        <div>
          {sortedArr.today.slice().reverse().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation="planned" />
          ))}
        </div>
      )}

      {count.tomorrow !== 0 && (
        <TaskItemHeader
          title="Tomorrow"
          isOpen={isOpen.tomorrow}
          openHandler={() => toggleListHandler("tomorrow")}
          count={count.tomorrow}
        />
      )}
      {count.tomorrow !== 0 && isOpen.tomorrow && (
        <div>
          {sortedArr.tomorrow.slice().reverse().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation="planned" />
          ))}
        </div>
      )}
      {count.next5Days !== 0 && (
        <TaskItemHeader
          title="Next Week Text"
          isOpen={isOpen.next5Days}
          openHandler={() => toggleListHandler("next5Days")}
          count={count.next5Days}
        />
      )}
      {count.next5Days !== 0 && isOpen.next5Days && (
        <div>
          {sortedArr.next5Days.slice().reverse().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation="planned" />
          ))}
        </div>
      )}

      {count.later !== 0 && (
        <TaskItemHeader
          title="Later"
          isOpen={isOpen.later}
          openHandler={() => toggleListHandler("later")}
          count={count.later}
        />
      )}
      {count.later !== 0 && isOpen.later && (
        <div>
          {sortedArr.later.slice().reverse().map((todo) => (
            <TaskItem key={todo.id} todo={todo} currentLocation="planned" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlannedList;




const classifyDate = (task) => {
  if (!task.dueDate) return;
  const dateToClassify = new Date(task.dueDate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const oneWeekLater = new Date(currentDate);
  oneWeekLater.setDate(currentDate.getDate() + 7);

  if (dateToClassify < currentDate) {
    return "earlier";
  } else if (dateToClassify.toDateString() === currentDate.toDateString()) {
    return "today";
  } else if (dateToClassify.toDateString() === tomorrow.toDateString()) {
    return "tomorrow";
  } else if (dateToClassify > tomorrow && dateToClassify <= oneWeekLater) {
    return "next5Days";
  } else {
    return "later";
  }
};


