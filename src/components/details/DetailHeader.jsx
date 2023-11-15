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
import {
  useChangeTaskTodoApiMutation,
  useSetCompleteTodoApiMutation,
  useSetImportanceTodoApiMutation,
} from "../../api/todoApiSlice";
import useAuth from "../../hooks/useAuth";

const DetailHeader = ({ taskId, todo, isApiData }) => {
  // const todo = useSelector((state) =>
  //   state.todo.todos.find((todo) => todo.id === taskId)
  // );

  const dispatch = useDispatch();
  const textAreaRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isEscaped, setIsEscaped] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [changeTaskTodoApi] = useChangeTaskTodoApiMutation();
  const { user, loading: isAuthLoading } = useAuth();

  const [setCompleteTodoApi] = useSetCompleteTodoApiMutation();
  const [setImportanceTodoApi] = useSetImportanceTodoApiMutation();

  const taskEditHandler = (event) => {
    setNewTask(event.target.value);
  };

  const completedHandler = () => {
    if (!todo) return;
    if (todo.complete) {
      if (isApiData) {
        setCompleteTodoApi({ todoId: todo.id, user, value: false });
      } else {
        dispatch(setCompleteTodo({ id: todo.id, value: false }));
      }
    } else {
      if (isApiData) {
        setCompleteTodoApi({ todoId: todo.id, user, value: true });
      } else {
        dispatch(setCompleteTodo({ id: todo.id, value: true }));
      }
      setIsFocused(false);
      setIsActive(false);
    }
  };

  const importanceHandler = () => {
    if (todo.importance) {
      if (isApiData) {
        setImportanceTodoApi({ todoId: todo.id, user, value: "" });
      } else {
        dispatch(setImportanceTodo({ id: todo.id, value: "" }));
      }
    } else {
      if (isApiData) {
        setImportanceTodoApi({
          todoId: todo.id,
          user,
          value: new Date().toISOString(),
        });
      } else {
        dispatch(
          setImportanceTodo({ id: todo.id, value: new Date().toISOString() })
        );
      }
    }
  };

  const blurHandler = () => {
    if (!isEscaped) {
      if (!newTask) {
        // task가 비어있으면 초기화
        setNewTask(todo.task);
        return;
      }
      if (isApiData) {
        changeTaskTodoApi({ todoId: todo.id, user, value: newTask });
      } else {
        dispatch(changeTaskTodo({ id: todo.id, task: newTask }));
      }
    }
    setIsFocused(false);
    setIsActive(false);
  };

  const clickHandler = () => {
    setIsActive(true);
    setIsFocused(true);
    setIsEscaped(false);
    setTimeout(() => {
      // click하면 focus하고, cursor을 맨 뒤로 이동시킨다
      textAreaRef.current.focus();
      const end = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(end, end);
    }, 0);
  };

  const focusHandler = () => {
    setIsFocused(true);
    setIsEscaped(false);
  };

  useEffect(() => {
    if (!todo) return;
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
      className="flex items-center p-4 bg-white rounded-t z-10 hover:bg-ms-white-hover w-full"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-1 items-center justify-between w-full">
        <span
          className="flex items-center justify-center hover:cursor-pointer px-0.5"
          onClick={completedHandler}
        >
          {todo?.complete ? (
            <div className="animate-checkAnimationBase text-ms-font-blue">
              <BsCheckCircleFill size="16px" />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-100 z-20 text-ms-font-blue">
                <BsCheckCircle size="16px" />
              </div>
              <div className="z-10 text-ms-font-blue">
                <BsCircle size="16px" />
              </div>
            </div>
          )}
        </span>

        <div
          className={`w-full text-base font-semibold px-4 ${
            isHover ? "bg-ms-white-hover" : "bg-white"
          }`}
        >
          {isActive ? (
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
              className={`dark:bg-[#292827] ${
                isHover ? "bg-ms-white-hover" : "bg-white"
              }`}
              style={{
                resize: "none",
                textDecoration:
                  todo?.complete && !isFocused ? "line-through" : "",
                color: todo?.complete && !isFocused ? "#767678" : "",
                wordBreak: "break-all",
                lineHeight: "20px",
              }}
            />
          ) : (
            <div
              className="break-all leading-5 max-h-60 overflow-y-auto hover:cursor-text"
              onClick={clickHandler}
              style={{
                textDecoration:
                  todo?.complete && !isFocused ? "line-through" : "",
                color: todo?.complete && !isFocused ? "#767678" : "",
              }}
            >
              {newTask}
            </div>
          )}
        </div>

        <div
          className="hover:cursor-pointer text-ms-font-blue"
          onClick={importanceHandler}
          ref={tooltipRefs.setReference}
          {...getTooltipReferenceProps()}
        >
          {todo?.importance ? (
            <div className="animate-fillAnimation ">
              <BsStarFill size="18px" />
            </div>
          ) : (
            <BsStar size="18px" />
          )}
        </div>
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
          {todo?.importance ? "Remove importance." : "Mark task as important."}
        </div>
      )}
    </div>
  );
};

export default DetailHeader;
