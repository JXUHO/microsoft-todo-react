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
  const sortOrder = useSelector((state) => state.sort.myday.order);  // slice맞게 수정해야함
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
      console.log('useeffect trigger');
      console.log(sortTasks(sortBy, sortOrder, todos))
      setTodoArr(sortTasks(sortBy, sortOrder, todos));
    }
  }, [sortBy, sortOrder]);

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
 * - todoSlice에서 completedTodos 배열 삭제, addCompletedTodo & removeCompletedTodo reducer 삭제. -> MydayList에서 해당하는 코드 변경
 * - AddTask component에서 completedTime항목 추가(or complete삭제하고 Time만 남기는 것도 고려.)
 * - Myday component에서 sort popover, group popover기능 구현, 해당 value를 MydayList에 props로 전달 -> Myday에서 TasksToolbar component를 따로 분리하는것 고려.
 * - sort, group옵션은 redux store에 저장.
 * - MydayList component에 useEffect hook 정의, todos배열이 변경되거나, 전달된 sort, group옵션이 변경되면 조건에 따라 정렬해서 render.
 *
 * 
 * 
 * 
 * - utils/sortTasks함수에서 해당 항목이 존재하지 않으면 따로 정렬하지 않는 옵션을 추가해야함 (importance항목 없으면 추가정렬 안함)
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
 * props로 옵션 받아와서, 해당 옵션이 true인것만 map해서 출력하기
 * completed탭이나 earlier탭 고려하기
 *
 *
 * 등록순 역순으로 출력해야함(해결)
 * important눌리면 가장 앞으로 출력해야함(해결)
 *
 *
 * complete는 완료된 element를 가장 위에서 render한다.
 * complete가 다시 false로 바뀌거나 기존의 순서로 돌아온다
 *
 *
 *
 * drag-drop을 통해 task끼리 순서 변경 가능함
 * complete탭에서 importance버튼이 눌리면 상단으로 이동함
 *
 *
 */
