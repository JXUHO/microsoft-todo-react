import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskTodo,
  completeTodo,
  importanceTodo,
} from "../../store/todoSlice";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import {
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";

const DetailHeader = ({ taskId }) => {
  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo.id === taskId)
  );

  const dispatch = useDispatch();
  const [isCheckHover, setIsCheckHover] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isEscaped, setIsEscaped] = useState(false);

  const inputRef = useRef();

  const completedHandler = () => {
    dispatch(completeTodo(todo.id));
  };

  const importanceHandler = () => {
    dispatch(importanceTodo(todo.id));
  };

  const taskEditHandler = (event) => {
    setNewTask(event.target.value);
  };

  const blurHandler = () => {
    if (!isEscaped) {
      if (!newTask) {
        setNewTask(todo.task)
        return;
      }
      dispatch(changeTaskTodo({ id: todo.id, task: newTask }));
      console.log("dispatch");
    }
  };

  const focusHandler = () => {
    setIsEscaped(false);
    console.log("focus");
  };

  useEffect(() => {
    setNewTask(todo.task);
  }, [todo]);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
    if (event.key === "Escape") {
      setIsEscaped(true);
    }
  };

  useEffect(() => {
    if (isEscaped) {
      inputRef.current.blur();
      setNewTask(todo.task); // 초기화
    }
  }, [isEscaped])



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
      className="flex items-center justify-between min-h-52 px-4 py-4 bg-white rounded-t z-10 hover:bg-ms-white-hover"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-1 items-center">
        <span
          className="flex items-center justify-center w-8 h-6 hover:cursor-pointer"
          onClick={completedHandler}
          onMouseEnter={() => setIsCheckHover(true)}
          onMouseLeave={() => setIsCheckHover(false)}
        >
          {todo.complete ? (
            <BsCheckCircleFill size="16px" style={{ color: "#2564cf" }} />
          ) : isCheckHover ? (
            <BsCheckCircle size="16px" style={{ color: "#2564cf" }} />
          ) : (
            <BsCircle size="16px" style={{ color: "#2564cf" }} />
          )}
        </span>

        <div className="w-full text-base font-semibold px-4">
          <input
            ref={inputRef}
            rows="1"
            value={newTask}
            onChange={taskEditHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            onKeyDown={keyDownHandler}
            style={{
              height: "21px",
              border: "none",
              outline: "none",
              resize: "none",
              backgroundColor: isHover ? "#f5f4f4" : "white",
            }}
          />
        </div>
      </div>

      <div
        className="pr-2 hover:cursor-pointer"
        onClick={importanceHandler}
        ref={tooltipRefs.setReference}
        {...getTooltipReferenceProps()}
      >
        {todo.importance ? (
          <BsStarFill size="18px" style={{ color: "#2564cf" }} />
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
    </div>
  );
};

export default DetailHeader;

/**
 * TODO
 *
 * 
 * 
 *
 *
 */
