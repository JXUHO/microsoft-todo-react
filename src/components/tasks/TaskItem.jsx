import { useDispatch, useSelector } from "react-redux";
import {
  changeDueDateTodo,
  changeMydayTodo,
  changeOptionTodo,
  completeTodo,
  importanceTodo,
  removeTodo,
} from "../../store/todoSlice";
import { closeDetail, openDetail } from "../../store/uiSlice";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsStar,
  BsStarFill,
  BsSun,
  BsCalendarDate,
  BsCalendarPlus,
  BsTrash3,
  BsCalendarX,
  BsSunset,
  BsStarHalf,
} from "react-icons/bs";
import { useState } from "react";
import {
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import TaskItemCategories from "./TaskItemCategories";
import { addActiveTasks, initializeActiveStep, initializeActiveTasks } from "../../store/activeSlice";
import { Menu, MenuItem, MenuSeparator } from "../modals/ContextMenu";
import TaskItemOptions from "./TaskItemOptions";
import { GoCheckCircle } from "react-icons/go";
import getLastTimeOfDay from "../../utils/getDates";

const TaskItem = ({ todo, currentLocation }) => {
  const dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const activeTasks = useSelector((state) => state.active.activeTasks); //#eff6fc

  const completedHandler = () => {
    dispatch(completeTodo(todo.id));
  };

  const importanceHandler = () => {
    dispatch(importanceTodo(todo.id));
  };

  const taskClickHandler = (id) => {
    dispatch(initializeActiveTasks())
    dispatch(openDetail());
    dispatch(addActiveTasks(id));
    dispatch(initializeActiveStep());
  };

  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext,
  } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    placement: "top",
    middleware: [offset(5), flip(), shift({ padding: 10 })],
  });

  const {
    getReferenceProps: getTooltipReferenceProps,
    getFloatingProps: getTooltipFloatingProps,
  } = useInteractions([
    useHover(tooltipContext, { delay: { open: 300, close: 0 } }),
    useDismiss(tooltipContext, {
      referencePress: true,
    }),
  ]);

  return (
    <div
      className={`flex items-center mt-2 min-h-52 px-4 py-0 rounded animate-slideFadeDown100 ${
        activeTasks.includes(todo.id)
          ? "bg-ms-active-blue"
          : "bg-white hover:bg-ms-white-hover"
      }`}
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
      }}
    >
      <span
        onClick={completedHandler}
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer"
      >
        {todo.complete ? (
          <div className="animate-checkAnimationBase">
            <BsCheckCircleFill size="16px" style={{ color: "#2564cf" }} />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-100 z-20">
              <BsCheckCircle size="16px" style={{ color: "#2564cf" }} />
            </div>
            <div className="z-10">
              <BsCircle size="16px" style={{ color: "#2564cf" }} />
            </div>
          </div>
        )}
      </span>

      <button
        onClick={() => taskClickHandler(todo.id)}
        className="hover:cursor-pointer px-3 py-2 flex-1 text-left"
        style={{ color: "#292827" }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsClicked(true); 
          dispatch(addActiveTasks(todo.id));
        }}
      >
        <span style={todo.complete ? { textDecoration: "line-through" } : null}>
          {todo.task}
        </span>

        <div className="flex flex-wrap flex-row items-center leading-3">
          <span className="text-xs" style={{ color: "#797775" }}>
            Tasks
          </span>
          <TaskItemOptions todo={todo} currentLocation={currentLocation} />
          <TaskItemCategories todo={todo} />
        </div>
      </button>

      <div
        className="pr-2 hover:cursor-pointer"
        onClick={importanceHandler}
        ref={tooltipRefs.setReference}
        {...getTooltipReferenceProps()}
      >
        {todo.importance ? (
          <div className="animate-fillAnimation">
            <BsStarFill size="18px" style={{ color: "#2564cf" }} />
          </div>
        ) : (
          <BsStar size="18px" style={{ color: "#2564cf" }} />
        )}
      </div>

      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          {...getTooltipFloatingProps()}
          style={{
            ...tooltipFloatingStyles,
            boxShadow:
              "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
            zIndex: 50,
          }}
          className="bg-white py-1.5 rounded-sm px-2 text-xs"
        >
          {todo.importance ? "Remove importance." : "Mark task as important."}
        </div>
      )}

      <TaskContextMenu
        todo={todo}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </div>
  );
};

export default TaskItem;







const TaskContextMenu = ({ todo, isClicked, setIsClicked }) => {
  const dispatch = useDispatch();

  return (
    <Menu isClicked={isClicked} setIsClicked={setIsClicked}>
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

      <MenuItem onClick={() => {
        dispatch(closeDetail())
        dispatch(removeTodo(todo.id))
      }}>
        <div className="mx-1 text-red-700">
          <BsTrash3 size="16px" />
        </div>
        <div className="px-1 mx-1 text-red-700">Delete task</div>
      </MenuItem>
    </Menu>
  );
};
