import { useDispatch } from "react-redux";
import { completeTodo, importanceTodo } from "../../store/todoSlice";
import { openDetail } from "../../store/uiSlice";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsStar,
  BsStarFill,
  BsSun,
} from "react-icons/bs";
import { PiArrowsClockwiseBold, PiNoteBlankLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getCustomFormatDateString } from "../../utils/getDates";
import { IoCalendarOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
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
import { FiPaperclip } from "react-icons/Fi";

const TaskItem = ({ todo, currentLocation }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [dueText, setDueText] = useState("");
  const [remindText, setRemindText] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [stepIncompleteLength, setStepIncompleteLength] = useState(0);

  const completedHandler = () => {
    dispatch(completeTodo(todo.id));
  };

  const importanceHandler = () => {
    dispatch(importanceTodo(todo.id));
  };

  const detailOpenHandler = (id) => {
    dispatch(openDetail(id));
  };

  useEffect(() => {
    if (todo.dueDate) {
      setDueText(getCustomFormatDateString(new Date(todo.dueDate), "dueDate"));
    }
    if (todo.remind) {
      setRemindText(getCustomFormatDateString(new Date(todo.remind), "remind"));
    }
    if (todo.steps.length) {
      setStepIncompleteLength(
        todo.steps.filter((step) => step.complete).length
      );
    }
    if (!todo.dueDate) {
      setDueText("")
    }
    if (!todo.remind) {
      setRemindText("")
    }
  }, [todo]);

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
      className="flex items-center mt-2 min-h-52 px-4 py-0 bg-white rounded hover:bg-ms-white-hover"
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
      }}
    >
      <span
        onClick={completedHandler}
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {todo.complete ? (
          <BsCheckCircleFill size="16px" style={{ color: "#2564cf" }} />
        ) : isHovered ? (
          <BsCheckCircle size="16px" style={{ color: "#2564cf" }} />
        ) : (
          <BsCircle size="16px" style={{ color: "#2564cf" }} />
        )}
      </span>

      <button
        onClick={() => detailOpenHandler(todo.id)}
        className="hover:cursor-pointer px-3 py-2 flex-1 text-left"
        style={{ color: "#292827" }}
      >
        <span style={todo.complete ? { textDecoration: "line-through" } : null}>
          {todo.task}
        </span>


        <div className="flex flex-wrap flex-row items-center leading-3">

          {<span className="text-xs" style={{ color: "#797775" }}>
            Tasks
          </span>}

          {currentLocation !=="myday" && todo.myday && (
            <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
              <span className="mr-1">
                <BsSun size="12px" />
              </span>
              <span className="text-xs mr-1" style={{ color: "#797775" }}>My Day</span>
              </div>
            )}

          {todo.steps.length !== 0 && (
            <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
              <span className="text-xs mr-1" style={{ color: "#797775" }}>
                {stepIncompleteLength} of {todo.steps.length}
              </span>
            </div>
          )}

          <div
            className="flex items-center"
            style={
              dueText === "Today"
                ? { color: "#2564cf" }
                : dueText.split(",")[0] === "Overdue"
                ? { color: "#a80000" }
                : { color: "#797775" }
            }
          >
            {dueText && (
              <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
                <span className="mr-1">
                  <IoCalendarOutline size="14px" />
                </span>
                <span className="text-xs mr-1">{dueText}</span>
              </div>
            )}
            {todo.repeatRule && (
              <span>
                <PiArrowsClockwiseBold size="14px" />
              </span>
            )}
          </div>
          {remindText && (
            <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
              <span className="mr-1">
                <VscBell size="14px" color="#797775" />
              </span>
              <span className="text-xs mr-1" style={{ color: "#797775" }}>
                {remindText}
              </span>
            </div>
          )}

          {/* note */}
          {todo.note.content.trim() && (
            <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
              <span className="mr-1">
                <PiNoteBlankLight size="14px" />
              </span>
              {!todo.file && !todo.dueDate && !todo.remind && <span className="text-xs mr-1" style={{ color: "#797775" }}>Note</span>}
              </div>
            )}

          {/* file attached */}
          {todo.file && (
            <div className="flex items-center before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500">
              <span className="mr-1">
              <FiPaperclip size="12px" style={{transform: "rotate(180deg)"}}/>
              </span>
              <span className="text-xs mr-1" style={{ color: "#797775" }}>Files attached</span>
              </div>
            )}

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

export default TaskItem;

/**
 * TODO
 *
 * 클릭하면 파란색으로 바뀜. state로 관리
 *
 *
 *
 */
