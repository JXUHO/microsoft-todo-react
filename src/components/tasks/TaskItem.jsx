import { useDispatch, useSelector } from "react-redux";
import { setCompleteTodo, setImportanceTodo } from "../../store/todoSlice";
import { closeDetail, openContextMenu, openDetail } from "../../store/uiSlice";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsStar,
  BsStarFill,
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
import {
  addActiveTasks,
  initializeActiveRange,
  initializeActiveStep,
  initializeActiveTasks,
  removeActiveTask,
  setActiveRange,
} from "../../store/activeSlice";
import TaskItemOptions from "./TaskItemOptions";
import { useSetCompleteTodoApiMutation, useSetImportanceTodoApiMutation } from "../../api/todoApiSlice";

const TaskItem = ({ todo, currentLocation }) => {
  const dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const activeTasksId = useSelector((state) => state.active.activeTasks);
  const isCtrlKeyDown = useSelector((state) => state.modifier.ctrl);
  const isShiftKeyDown = useSelector((state) => state.modifier.shift);


  const user = useSelector(state => state.auth.user)
  const [setCompleteTodoApi] = useSetCompleteTodoApiMutation()
  const [setImportanceTodoApi] = useSetImportanceTodoApiMutation()

  const completeHandler = () => {
    if (todo.complete) {
      if (user) {
        setCompleteTodoApi({todoId:todo.id, user, value: false})
      } else {
        dispatch(setCompleteTodo({ id: todo.id, value: false }));
      }
    } else {
      if (user) {
        setCompleteTodoApi({todoId:todo.id, user, value:true})
      } else {
        dispatch(setCompleteTodo({ id: todo.id, value: true }));
      }
    }
  };



  // const completeHandler = () => {
  //   if (todo.complete) {
  //     dispatch(setCompleteTodo({ id: todo.id, value: false }));
  //   } else {
  //     dispatch(setCompleteTodo({ id: todo.id, value: true }));
  //   }
  // };





  const importanceHandler = () => {
    if (todo.importance) {
      if (user) {
        setImportanceTodoApi({todoId: todo.id, user, value:""})
      } else {
        dispatch(setImportanceTodo({ id: todo.id, value: "" }));
      }
    } else {
      if (user) {
        setImportanceTodoApi({todoId: todo.id, user, value:new Date().toISOString()})
      } else {
        dispatch(setImportanceTodo({ id: todo.id, value: new Date().toISOString() }));
      }
    }
  };

  // const importanceHandler = () => {
  //   if (todo.importance) {
  //     dispatch(setImportanceTodo({ id: todo.id, value: false }));
  //   } else {
  //     dispatch(setImportanceTodo({ id: todo.id, value: true }));
  //   }
  // };



  const taskClickHandler = (id) => {
    dispatch(initializeActiveStep());

    if (!isCtrlKeyDown && !isShiftKeyDown) {
      dispatch(initializeActiveTasks());
      dispatch(initializeActiveRange());
      dispatch(addActiveTasks(id));
      dispatch(openDetail());
    } else {
      dispatch(closeDetail());
    }
    if (isCtrlKeyDown) {
      if (activeTasksId.includes(todo.id)) {
        dispatch(removeActiveTask(todo.id));
      } else {
        dispatch(addActiveTasks(id));
      }
    }
    if (isShiftKeyDown && activeTasksId.length !== 0) {
      dispatch(setActiveRange(id));
      dispatch(initializeActiveTasks());
    }
  };

  const contextMenuHandler = (e) => {
    e.preventDefault();
    if (!activeTasksId.includes(todo.id)) {
      // active가 아닌 task가 클릭되면 -> 초기화, add
      dispatch(initializeActiveTasks());
      dispatch(addActiveTasks(todo.id));
    }
    dispatch(openContextMenu());
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
      className={`flex items-center mt-2 min-h-52 px-4 py-0 rounded animate-slideFadeDown100 break-all ${
        activeTasksId.includes(todo.id)
          ? "bg-ms-active-blue"
          : "bg-white hover:bg-ms-white-hover"
      }`}
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
      }}
    >
      <span
        onClick={completeHandler}
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer text-ms-font-blue"
      >
        {todo.complete ? (
          <div className="animate-checkAnimationBase">
            <BsCheckCircleFill size="16px"/>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-100 z-20">
              <BsCheckCircle size="16px"/>
            </div>
            <div className="z-10">
              <BsCircle size="16px"/>
            </div>
          </div>
        )}
      </span>

      <button
        onClick={() => taskClickHandler(todo.id)}
        className="hover:cursor-pointer px-3 py-2 flex-1 text-left text-ms-text-dark"
        onContextMenu={contextMenuHandler}
      >
        <span style={todo.complete ? { textDecoration: "line-through" } : null} className="">
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
        className="pr-2 hover:cursor-pointer text-ms-font-blue"
        onClick={importanceHandler}
        ref={tooltipRefs.setReference}
        {...getTooltipReferenceProps()}
      >
        {todo.importance ? (
          <div className="animate-fillAnimation">
            <BsStarFill size="18px" />
          </div>
        ) : (
          <BsStar size="18px" />
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
          }}
          className="bg-white py-1.5 rounded-sm px-2 text-xs"
        >
          {todo.importance ? "Remove importance." : "Mark task as important."}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
