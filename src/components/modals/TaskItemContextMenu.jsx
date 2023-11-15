import { useDispatch, useSelector } from "react-redux";
import {
  changeOptionTodo,
  removeTodo,
  setCompleteTodo,
  setImportanceTodo,
  setMydayTodo,
} from "../../store/todoSlice";
import { closeDetail, setDialog } from "../../store/uiSlice";
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
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useChangeOptionTodoApiMutation, useSetCompleteTodoApiMutation, useSetImportanceTodoApiMutation, useSetMydayTodoApiMutation } from "../../api/todoApiSlice";

const TaskItemContextMenu = ({todos, isApiData, isLoading}) => {
  const location = useLocation();
  // const todos = useSelector((state) => state.todo.todos);
  const activeTasksId = useSelector((state) => state.active.activeTasks);
  const dispatch = useDispatch();

  const { user, loading: isAuthLoading } = useAuth();
  const [setMydayTodoApi] = useSetMydayTodoApiMutation();
  const [changeOptionTodoApi] = useChangeOptionTodoApiMutation();
  const [setImportanceTodoApi] = useSetImportanceTodoApiMutation()
  const [setCompleteTodoApi] = useSetCompleteTodoApiMutation()

  let addMyday = false;
  let removeMyday = false;
  let addImportance = false;
  let removeImportance = false;
  let addComplete = false;
  let removeComplete = false;
  let removeDuedate = false;

  todos.forEach((todo) => {
    if (activeTasksId.includes(todo.id)) {
      if (todo.myday) removeMyday = true;
      if (!todo.myday) addMyday = true;
      if (todo.importance) removeImportance = true;
      if (!todo.importance) addImportance = true;
      if (todo.complete) removeComplete = true;
      if (!todo.complete) addComplete = true;
      if (todo.dueDate) removeDuedate = true;
    }
  });

  const clickHandler = (option) => {
    const actionMap = {
      addMyday: (taskId) => {
        if (isApiData) {
          setMydayTodoApi({ todoId: taskId, user, value: true });
        } else {
          dispatch(setMydayTodo({ id: taskId, value: true }));
        }
      },

      removeMyday: (taskId) => {
        if (isApiData) {
          setMydayTodoApi({ todoId: taskId, user, value: false });
        } else {
          dispatch(setMydayTodo({ id: taskId, value: false }));
        }
      },

      addImportance: (taskId) => {
        if (isApiData) {
          setImportanceTodoApi({todoId:taskId, user, value: new Date().toISOString()})
        } else {
          dispatch(
            setImportanceTodo({ id: taskId, value: new Date().toISOString() })
          )
        }
      },
      
      removeImportance: (taskId) => {
        if (isApiData) {
          setImportanceTodoApi({todoId:taskId, user, value: ""})
        } else {
          dispatch(setImportanceTodo({ id: taskId, value: "" }))
        }
      },

      addComplete: (taskId) => {
        if (isApiData) {  
          setCompleteTodoApi({todoId:taskId, user, value: true})
        } else {
          dispatch(setCompleteTodo({ id: taskId, value: true }))
        }
      },

      removeComplete: (taskId) => {
        if (isApiData) {
          setCompleteTodoApi({todoId:taskId, user, value: false})
        } else {
          dispatch(setCompleteTodo({ id: taskId, value: false }))
        }

      },

      dueToday: (taskId) => {
        if (isApiData) {
          changeOptionTodoApi({
            todoId: taskId,
            user,
            option: "dueDate",
            content: new Date().toISOString(),
            currentLocation: location.pathname,
          });
        } else {
          dispatch(
            changeOptionTodo({
              id: taskId,
              content: new Date().toISOString(),
              option: "dueDate",
              currentLocation: location.pathname,
            })
          );
        }
      },
      dueTomorrow: (taskId) => {
        if (isApiData) {
          changeOptionTodoApi({
            todoId: taskId,
            user,
            option: "dueDate",
            content: getLastTimeOfDay(1).toISOString(),
            currentLocation: location.pathname,
          });
        } else {
          dispatch(
            changeOptionTodo({
              id: taskId,
              option: "dueDate",
              content: getLastTimeOfDay(1).toISOString(),
              currentLocation: location.pathname,
            })
          );
        }
      },

      removeDuedate: (taskId) => {
        if (isApiData) {
          changeOptionTodoApi({
            todoId: taskId,
            user,
            option: "dueDate",
            content: "",
            currentLocation: location.pathname,
          });
        } else {
          dispatch(
            changeOptionTodo({
              id: taskId,
              option: "dueDate",
              content: "",
              currentLocation: location.pathname,
            })
          );
        }
      },

      deleteTask: (taskId) => {
        dispatch(setDialog(true));
      },
    };

    activeTasksId.forEach((taskId) => {
      const action = actionMap[option];
      if (action) {
        action(taskId);
      }
    });
  };

  return (
    <Menu>
      {addMyday && (
        <MenuItem onClick={() => clickHandler("addMyday")}>
          <div className="mx-1">
            <BsSun size="16px" />
          </div>
          <div className="px-1 mx-1">Add to My Day</div>
        </MenuItem>
      )}
      {removeMyday && (
        <MenuItem onClick={() => clickHandler("removeMyday")}>
          <div className="mx-1">
            <BsSunset size="16px" />
          </div>
          <div className="px-1 mx-1">Remove from My Day</div>
        </MenuItem>
      )}

      {addImportance && (
        <MenuItem onClick={() => clickHandler("addImportance")}>
          <div className="mx-1">
            <BsStar size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as important</div>
        </MenuItem>
      )}
      {removeImportance && (
        <MenuItem onClick={() => clickHandler("removeImportance")}>
          <div className="mx-1">
            <BsStarHalf size="16px" />
          </div>
          <div className="px-1 mx-1">Remove importance</div>
        </MenuItem>
      )}

      {addComplete && (
        <MenuItem onClick={() => clickHandler("addComplete")}>
          <div className="mx-1">
            <GoCheckCircle size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as completed</div>
        </MenuItem>
      )}
      {removeComplete && (
        <MenuItem onClick={() => clickHandler("removeComplete")}>
          <div className="mx-1">
            <BsCircle size="16px" />
          </div>
          <div className="px-1 mx-1">Mark as not completed</div>
        </MenuItem>
      )}

      <MenuSeparator />

      <MenuItem onClick={() => clickHandler("dueToday")}>
        <div className="mx-1">
          <BsCalendarDate size="16px" />
        </div>
        <div className="px-1 mx-1">Due today</div>
      </MenuItem>

      <MenuItem onClick={() => clickHandler("dueTomorrow")}>
        <div className="mx-1">
          <BsCalendarPlus size="16px" />
        </div>
        <div className="px-1 mx-1">Due tomorrow</div>
      </MenuItem>

      {removeDuedate && (
        <MenuItem onClick={() => clickHandler("removeDuedate")}>
          <div className="mx-1">
            <BsCalendarX size="16px" />
          </div>
          <div className="px-1 mx-1">Remove due date</div>
        </MenuItem>
      )}

      <MenuSeparator />

      <MenuItem onClick={() => clickHandler("deleteTask")}>
        <div className="mx-1 text-ms-warning">
          <BsTrash3 size="16px" />
        </div>
        <div className="px-1 mx-1 text-ms-warning">Delete task</div>
      </MenuItem>
    </Menu>
  );
};

export default TaskItemContextMenu;
