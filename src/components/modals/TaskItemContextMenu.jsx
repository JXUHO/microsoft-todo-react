import { useDispatch, useSelector } from "react-redux";
import {
  changeDueDateTodo,
  changeMydayTodo,
  changeOptionTodo,
  completeTodo,
  importanceTodo,
  removeTodo,
} from "../../store/todoSlice";
import { closeDetail } from "../../store/uiSlice";
import {
  BsCircle,
  BsStar,
  BsSun,
  BsCalendarDate,
  BsCalendarPlus,
  BsTrash3,
  BsCalendarX,
  BsSunset,
  BsStarHalf,
} from "react-icons/bs";
import { Menu, MenuItem, MenuSeparator } from "../modals/ContextMenu";
import { GoCheckCircle } from "react-icons/go";
import getLastTimeOfDay from "../../utils/getDates";



// todo를 activeTasks로 변경해야함. 복수 옵션 선택 가능하도록 변경.
// 1. TaskContextMenu component 호출을 RootPage로 이동
// 2. todos에서 activeTasks에 있는 todo item을 차례대로 가지고옴
// 3. isClicked와 setIsClicked를 uiSlice의 state로 이동시킴. Menu에서 useSelector를 통해 가지고옴


const TaskItemContextMenu = () => {
  // TaskItem 개수만큼 실행됨... 최적화 필요
  //

  const todos = useSelector((state) => state.todo.todos);
  const activeTasks = useSelector((state) => state.active.activeTasks);
  const dispatch = useDispatch();

  const todo = activeTasks[0]

  console.log("context");


  return (
    <Menu>
      {todo.myday ? (
        <MenuItem onClick={() => dispatch(changeMydayTodo(todo.id))}>
          <div className="mx-1">
            <BsSunset size="16px" />
          </div>
          <div className="px-1 mx-1">Remove from My Day</div>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => dispatch(changeMydayTodo(todo.id))}>
          <div className="mx-1">
            <BsSun size="16px" />
          </div>
          <div className="px-1 mx-1">Add to My Day</div>
        </MenuItem>
      )}

      {todo.importance ? (
        <MenuItem onClick={() => dispatch(importanceTodo(todo.id))}>
          <div className="mx-1">
            <BsStarHalf size="16px" />
          </div>
          <div className="px-1 mx-1">Remove importance</div>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => dispatch(importanceTodo(todo.id))}>
          <div className="mx-1">
            <BsStar size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as important</div>
        </MenuItem>
      )}

      {todo.complete ? (
        <MenuItem onClick={() => dispatch(completeTodo(todo.id))}>
          <div className="mx-1">
            <BsCircle size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as not completed</div>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => dispatch(completeTodo(todo.id))}>
          <div className="mx-1">
            <GoCheckCircle size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as completed</div>
        </MenuItem>
      )}

      <MenuSeparator />

      <MenuItem
        onClick={() =>
          dispatch(
            changeDueDateTodo({
              id: todo.id,
              dueDate: new Date().toISOString(),
            })
          )
        }
      >
        <div className="mx-1">
          <BsCalendarDate size="16px" />
        </div>
        <div className="px-1 mx-1">Due today</div>
      </MenuItem>

      <MenuItem
        onClick={() =>
          dispatch(
            changeOptionTodo({
              id: todo.id,
              option: "dueDate",
              content: getLastTimeOfDay(1).toISOString(),
            })
          )
        }
      >
        <div className="mx-1">
          <BsCalendarPlus size="16px" />
        </div>
        <div className="px-1 mx-1">Due tomorrow</div>
      </MenuItem>

      {todo.dueDate && (
        <MenuItem
          onClick={() =>
            dispatch(
              changeOptionTodo({
                id: todo.id,
                option: "dueDate",
                content: "",
              })
            )
          }
        >
          <div className="mx-1">
            <BsCalendarX size="16px" />
          </div>
          <div className="px-1 mx-1">Remove due date</div>
        </MenuItem>
      )}

      <MenuSeparator />

      <MenuItem
        onClick={() => {
          dispatch(closeDetail());
          dispatch(removeTodo(todo.id));
        }}
      >
        <div className="mx-1 text-red-700">
          <BsTrash3 size="16px" />
        </div>
        <div className="px-1 mx-1 text-red-700">Delete task</div>
      </MenuItem>
    </Menu>
  );
};

export default TaskItemContextMenu;


  // const selectedTasks = []
  // todos.forEach(todo => {
  //   activeTasks.forEach(activeTask => {
  //     if (todo.id === activeTask) {
  //       selectedTasks.push(todo)
  //     }
  //   })
  // })

  // console.log(selectedTasks);

  // console.log("context");