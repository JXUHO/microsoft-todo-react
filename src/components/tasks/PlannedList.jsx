import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TaskItemHeader from "./TaskItemHeader";
import TaskItem from "./TaskItem";
import { addActiveTasks } from "../../store/activeSlice";

const PlannedList = () => {
  const dispatch = useDispatch();
  const activeRange = useSelector((state) => state.active.activeRange);
  const todoArr = useSelector((state) => state.todo.todos);
  const [activeArr, setActiveArr] = useState([]);
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
    setActiveArr([
      ...tempSortedArr.earlier.slice().reverse(),
      ...tempSortedArr.today.slice().reverse(),
      ...tempSortedArr.tomorrow.slice().reverse(),
      ...tempSortedArr.next5Days.slice().reverse(),
      ...tempSortedArr.later.slice().reverse(),
    ]);
    setSortedArr(tempSortedArr);
    setCount(listCount);
  }, [todoArr]);


  useEffect(() => {
    // 정렬된 task를 shift keydown activeRange에 따라 active 설정
    if (activeRange.length !== 0) {
      const [startId, endId] = activeRange.map((taskId) =>
        activeArr.findIndex((todo) => todo.id === taskId)
      );
      if (startId !== -1 && endId !== -1) {
        const [minIndex, maxIndex] = [startId, endId].sort((a, b) => a - b);
        const activeTasksArr = activeArr.slice(minIndex, maxIndex + 1);

        activeTasksArr.forEach((task) => {
          dispatch(addActiveTasks(task.id));
        });
      }
    }
  }, [activeRange, activeArr, dispatch]);

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
          {sortedArr.earlier
            .slice()
            .reverse()
            .map((todo) => (
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
          {sortedArr.today
            .slice()
            .reverse()
            .map((todo) => (
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
          {sortedArr.tomorrow
            .slice()
            .reverse()
            .map((todo) => (
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
          {sortedArr.next5Days
            .slice()
            .reverse()
            .map((todo) => (
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
          {sortedArr.later
            .slice()
            .reverse()
            .map((todo) => (
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
