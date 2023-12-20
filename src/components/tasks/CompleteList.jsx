import React, { useCallback, useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import TaskItemHeader from "./TaskItemHeader";
import { addActiveTasks } from "../../store/activeSlice";

const CompleteList = ({ todoArr, currentLocation }) => {
  const dispatch = useDispatch();
  const activeRange = useSelector((state) => state.active.activeRange);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const activeTasksId = useSelector((state) => state.active.activeTasks);

  console.log('complete list');

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
  }, [activeRange]);

  const completeCount = todoArr.reduce(
    (acc, todo) => (todo.complete ? acc + 1 : acc),
    0
  );

  const title = currentLocation === "completed" ? "Tasks" : "Completed";

  if (currentLocation === "completed" && !isCompleteOpen) {
    // completed탭에서는 초기값을 open으로 설정
    setIsCompleteOpen(true);
  }




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
          // console.log("load more");
          loadMoreTasks();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [tasksToShow, todoArr.length]
  );

  const incompleteTodoArr = todoArr.filter((task) => task.complete);
  const limitTodoArr = incompleteTodoArr.slice(0, tasksToShow);

  const content = limitTodoArr.map((todo, index) => {
    if (limitTodoArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
          
        />
      );
    }
    return (
      <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation} 
          isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  
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
           {/* {isCompleteOpen && (
             <div>
               {todoArr.slice().map((todo) => (
                 <TaskItem
                   key={todo.id}
                   todo={todo}
                   currentLocation={currentLocation}
                 />
               ))}
             </div>
           )} */}
          {isCompleteOpen && <div>{content}</div>}
        </div>
      )}
    </>
  );
};

export default React.memo(CompleteList);

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
