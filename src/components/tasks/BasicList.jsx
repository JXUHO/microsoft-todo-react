import { useCallback, useRef, useState } from "react";
import TaskItem from "./TaskItem";

const BasicList = ({ todoArr, currentLocation }) => {
  const [tasksToShow, setTasksToShow] = useState(20);

  const loadMoreTasks = () => {
    setTasksToShow((prev) => prev + 20);
  };

  // repeatRule 설정된 task가 완료됐을 때는 render되지 않더라도 complete task가 존재함... scrollbar 생성되는 문제.. 해결할것.
  const noIncomplete = todoArr.every((todo) => todo.complete === "");

  const observer = useRef();
  const lastTaskRef = useCallback((task) => {
    // if (isLoading) return

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 'task가 더 남아있으면' 조건 추가
        console.log("trigger");
        loadMoreTasks();
      }
    });

    if (task) observer.current.observe(task);
  }, []);

  const limitTodoArr = todoArr.slice(0, tasksToShow);
  const content = limitTodoArr.map((todo, index) => {
    if (!todo.complete) {
      // if (limitTodoArr.length === index + 1) {
      if (limitTodoArr.length === index + 10) {
        // 로드된 마지막 task. ref 설정돼야 함.
        return (
          <TaskItem
            ref={lastTaskRef}
            key={todo.id}
            todo={todo}
            currentLocation={currentLocation}
          />
        );
      }
      return (
        <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation} />
      );
    }
  });

  return (
    <div
      className="flex flex-col px-6"
      style={
        noIncomplete ? { paddingBottom: "1.5rem" } : { paddingBottom: "5px" }
      }
    >
      {content}
      {/* {todoArr.slice(0, tasksToShow).map((todo, index) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
        }
      })} */}
      {/* {tasksToShow < todoArr.length && (
        <button onClick={loadMoreTasks}>Load More</button>
      )} */}
    </div>
  );
};

export default BasicList;

/**
 * 로드된 tasks중 마지막 task에 ref 설정
 *
 */

// 수정전
// import TaskItem from "./TaskItem";

// const BasicList = ({ todoArr, currentLocation }) => {
//   // repeatRule 설정된 task가 완료됐을 때는 render되지 않더라도 complete task가 존재함... scrollbar 생성되는 문제.. 해결할것.
//   const noIncomplete = todoArr.every((todo) => todo.complete === "")

//   return (
//     <div className="flex flex-col px-6" style={noIncomplete ? {paddingBottom:"1.5rem"} : {paddingBottom:"5px"}}>
//       {todoArr.slice().map((todo) => {
//         if (!todo.complete) {
//           return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
//         }
//       })}
//     </div>
//   );
// };

// export default BasicList;
