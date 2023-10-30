import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskTodo,
  setCompleteTodo,
  setImportanceTodo,
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

import TextareaAutosize from "react-textarea-autosize";

const DetailHeader = ({ taskId }) => {
  const todo = useSelector((state) =>
  state.todo.todos.find((todo) => todo.id === taskId)
  );
  
  const dispatch = useDispatch();
  const textAreaRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isEscaped, setIsEscaped] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  

  const taskEditHandler = (event) => {
    setNewTask(event.target.value);
  };

  const completedHandler = () => {
    if (todo.complete) {
      dispatch(setCompleteTodo({ id: todo.id, value: false }));
    } else {
      dispatch(setCompleteTodo({ id: todo.id, value: true }));
    }
  };

  const importanceHandler = () => {
    if (todo.importance) {
      dispatch(setImportanceTodo({ id: todo.id, value: false }));
    } else {
      dispatch(setImportanceTodo({ id: todo.id, value: true }));
    }
  };

  const blurHandler = () => {
    if (!isEscaped) {
      if (!newTask) {
        setNewTask(todo.task);
        return;
      }
      dispatch(changeTaskTodo({ id: todo.id, task: newTask }));
    }
    setIsFocused(false);
  };

  const focusHandler = () => {
    setIsFocused(true);
    setIsEscaped(false);
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
      textAreaRef.current.blur();
      setNewTask(todo.task); // 초기화
    }
  }, [isEscaped]);

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
      className="flex items-center justify-between p-4 bg-white rounded-t z-10 hover:bg-ms-white-hover"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-1 items-center">
        <span
          className="flex items-center justify-center hover:cursor-pointer px-0.5"
          onClick={completedHandler}
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

        <div className="w-full text-base font-semibold px-4">
          <TextareaAutosize
            ref={textAreaRef}
            rows="1"
            value={newTask}
            onChange={taskEditHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            onKeyDown={keyDownHandler}
            maxLength="255"
            maxRows={12}
            style={{
              resize:"none",
              backgroundColor: isHover ? "#f5f4f4" : "white",
              textDecoration: todo.complete && !isFocused ? "line-through" : "",
              color: todo.complete && !isFocused ? "#767678" : "",
              wordBreak :"break-all",
              lineHeight: "20px"
            }}
          />
        </div>
      </div>

      <div
        className="hover:cursor-pointer"
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
    </div>
  );
};

export default DetailHeader;
