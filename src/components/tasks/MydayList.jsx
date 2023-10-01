import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

const MydayList = () => {
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const todos = useSelector((state) => state.todo.todos);
  const completedTodos = useSelector(state => state.todo.completedTodos)

  const rotate = isCompleteOpen ? "rotate(90deg)" : "rotate(0)";
  

  const toggleCompleteHandler = () => {
    setIsCompleteOpen((prevState) => !prevState);
  };



  return (
    <>
      <div>
        {todos
          .slice()
          .reverse()
          .map((todo) => {
            if (todo.myday && !todo.complete) {
              return <TaskItem key={todo.id} todo={todo} />;
            }
          })}
        {completedTodos.length !== 0 && (
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
                      transform: rotate,
                      transition: "all 0.1s linear",
                    }}
                  />
                </div>
              </div>
              <div className="flex p-2">
                <h3 className="font-medium">Completed</h3>
                <h3 className="ml-2" style={{ color: "#797775" }}>
                  {completedTodos.length}
                </h3>
              </div>
            </div>
            {isCompleteOpen && (
              <div>
                {completedTodos.slice().reverse().map(todo => <TaskItem key={todo.id} todo={todo} />)}
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
 * props로 옵션 받아와서, 해당 옵션이 true인것만 map해서 출력하기
 * completed탭이나 earlier탭 고려하기
 *
 *
 * 등록순 역순으로 출력해야함(해결)
 * important눌리면 가장 앞으로 출력해야함(해결)
 *
 *
 * complete는 완료된 element를 가장 위에서 render한다.
 * complete가 다시 false로 바뀌거나, refresh되면 기존의 순서가 유지된다
 *
 *
 */
