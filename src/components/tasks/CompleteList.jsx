import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import TaskItemHeader from "./TaskItemHeader";
import { addActiveTasks } from "../../store/activeSlice";

const CompleteList = ({ todoArr, currentLocation }) => {
  const dispatch = useDispatch();
  const activeRange = useSelector((state) => state.active.activeRange);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const toggleCompleteHandler = () => {
    setIsCompleteOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // 정렬된 task를 shift keydown activeRange에 따라 active 설정
    if (activeRange.length !== 0) {
      const [startId, endId] = activeRange.map((taskId) =>
        todoArr.findIndex((todo) => todo.id === taskId)
      );
      if (startId !== -1 && endId !== -1) {
        const [minIndex, maxIndex] = [startId, endId].sort((a, b) => a - b);
        const activeTasksArr = todoArr.slice(minIndex, maxIndex + 1);

        activeTasksArr.forEach((task) => {
          dispatch(addActiveTasks(task.id));
        });
      }
    }
  }, [activeRange, todoArr, dispatch]);

  const completeCount = todoArr.reduce(
    (acc, todo) => (todo.complete ? acc + 1 : acc),
    0
  );

  const title = currentLocation === "completed" ? "Tasks" : "Completed";


  // completed탭에서는 초기값을 open으로 설정
  if (currentLocation === "completed" && !isCompleteOpen) {
    setIsCompleteOpen(true)
  }

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
              {todoArr.slice().map((todo) => {
                if (todo.complete) {
                  return (
                    <TaskItem
                      key={todo.id}
                      todo={todo}
                      currentLocation={currentLocation}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CompleteList;

// import { useEffect, useState } from "react";
// import TaskItem from "./TaskItem";
// import { useDispatch, useSelector } from "react-redux";
// import sortTasks from "../../utils/sortTasks";
// import TaskItemHeader from "./TaskItemHeader";
// import { addActiveTasks } from "../../store/activeSlice";

// const CompleteList = ({ currentLocation }) => {
//   const dispatch = useDispatch()
//   const activeRange = useSelector((state) => state.active.activeRange);
//   const todos = useSelector((state) => state.todo.todos);
//   const sortOrder = useSelector((state) => state.sort[currentLocation].order);
//   const sortBy = useSelector((state) => state.sort[currentLocation].sortBy);
//   const [isCompleteOpen, setIsCompleteOpen] = useState(true);
//   const [todoArr, setTodoArr] = useState([]);

//   const toggleCompleteHandler = () => {
//     setIsCompleteOpen((prevState) => !prevState);
//   };

//   useEffect(() => {
//     // myday, complete, sortBy 순서대로 적용해야함
//     let todoTemp = todos.slice().reverse();

//     todoTemp = todoTemp.filter((todo) => todo.complete);

//     // myday check
//     if (currentLocation === "myday") {
//       todoTemp = todoTemp.filter((todo) => todo.myday);
//     }

//     // sort옵션 적용
//     if (sortBy) {
//       setTodoArr(sortTasks(sortBy, sortOrder, todoTemp));
//     } else if (currentLocation !== "completed") {
//       // setTodoArr(todoTemp);
//       setTodoArr(sortTasks("completed", sortOrder, todoTemp));
//     } else {
//       setTodoArr(todoTemp);
//     }
//   }, [todos, sortBy, sortOrder]);

//   useEffect(() => {
//     // 정렬된 task를 shift keydown activeRange에 따라 active 설정
//     if (activeRange.length !== 0) {
//       const [startId, endId] = activeRange.map((taskId) =>
//         todoArr.findIndex((todo) => todo.id === taskId)
//       );
//       if (startId !== -1 && endId !== -1) {
//         const [minIndex, maxIndex] = [startId, endId].sort((a, b) => a - b);
//         const activeTasksArr = todoArr.slice(minIndex, maxIndex + 1);

//         activeTasksArr.forEach((task) => {
//           dispatch(addActiveTasks(task.id));
//         });
//       }
//     }
//   }, [activeRange, todoArr, dispatch]);

//   const completeCount = todoArr.reduce(
//     (acc, todo) => (todo.complete ? acc + 1 : acc),
//     0
//   );

//   const title = currentLocation === "completed" ? "Tasks" : "Completed";

//   return (
//     <>
//       {todoArr.some((todo) => todo.complete) && (
//         <div className="flex flex-col overflow-y-auto pb-6 px-6">
//           <TaskItemHeader
//             title={title}
//             isOpen={isCompleteOpen}
//             openHandler={toggleCompleteHandler}
//             count={completeCount}
//           />

//           {isCompleteOpen && (
//             <div>
//               {todoArr.slice().map((todo) => (
//                 <TaskItem
//                   key={todo.id}
//                   todo={todo}
//                   currentLocation={currentLocation}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default CompleteList;
