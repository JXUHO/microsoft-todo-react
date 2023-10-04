import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import sortTasks from "../utils/sortTasks";

const MydayList = () => {
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [completeCount, setCompleteCount] = useState(0);
  const todos = useSelector((state) => state.todo.todos);
  const [todoArr, setTodoArr] = useState([]);
  const [completeArr, setCompleteArr] = useState([]);
  const sortOrder = useSelector((state) => state.sort.myday.order);  
  const sortBy = useSelector((state) => state.sort.myday.sortBy);

  const rotate = isCompleteOpen ? "rotate(90deg)" : "rotate(0)";

  const toggleCompleteHandler = () => {
    setIsCompleteOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setCompleteCount(
      todos.reduce((acc, todo) => {
        // redux에 저장 고려하기
        if (todo.complete) {
          return acc + 1;
        }
        return acc;
      }, 0)
    );

    setTodoArr(todos);
  }, [todos]);


  useEffect(() => {
    if (sortBy) {
      // console.log('useeffect trigger');
      // console.log(sortTasks(sortBy, sortOrder, todos))
      setTodoArr(sortTasks(sortBy, sortOrder, todos));
    }

  }, [todos, sortBy, sortOrder]);

  return (
    <>
      <div>
        {todoArr
          .slice()
          .reverse()
          .map((todo) => {
            if (todo.myday && !todo.complete) {
              return <TaskItem key={todo.id} todo={todo} />;
            }
          })}
        {todoArr.some((todo) => todo.complete) && ( // complete항목이 존재한다면,
          <>
            <div
              className="flex items-center min-h-52 cursor-pointer"
              style={
                isCompleteOpen ? null : { boxShadow: "0 17px 0 -16px #e1dfdd" }
              }
              onClick={toggleCompleteHandler}
            >
              <div className="flex items-center justify-center w-8 h-8 cursor-pointer">
                <div>
                  <BsChevronRight
                    className="mt-1 ml-1"
                    style={{
                      color: "#797775",
                      transform: rotate,
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
                {todoArr
                  .slice()
                  .reverse()
                  .map((todo) => {
                    if (todo.myday && todo.complete) {
                      return <TaskItem key={todo.id} todo={todo} />;
                    }
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MydayList;

/**
 * TODO
 *
 * Complete탭은 별도로 추가된 순서에 따라 정렬함. todoSlice의 completeTodo에서 complete되면 완료된 시간을 isoString으로 추가하고,
 * complete가 비활성화되면 시간을 삭제한다. 이에 따라서 정렬 로직 생성할것
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * drag-drop을 통해 task끼리 순서 변경 가능함
 * complete탭에서 importance버튼이 눌리면 상단으로 이동함
 *
 *
 */
