import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../../store/todoSlice";
import { closeDetail } from "../../store/uiSlice";
import { LuPanelRightClose } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCustomFormatDateString } from "../../utils/getDates";
import Details from "./Details";
import {
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";

const TaskDetail = () => {
  // const detailId = useSelector((state) => state.ui.id);
  const detailId = useSelector((state) => state.active.activeTask);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const sidebarRef = useRef();
  const [isResizing, setIsResizing] = useState(false);
  const [resizerPosition, setResizerPosition] = useState(360);
  const [isHover, setIsHover] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);
  const [createdTime, setCreatedTime] = useState("");

  const [closeTooltipOpen, setCloseTooltipOpen] = useState(false);
  const [removeTooltipOpen, setRemoveTooltipOpen] = useState(false);

  const closeDetailHandler = () => {
    dispatch(closeDetail());
  };

  const removeTaskHandler = (id) => {
    dispatch(removeTodo(id));
    dispatch(closeDetail());
  };

  useEffect(() => {
    const todoDetail = todos.find((todo) => todo.id === detailId);
    setCreatedTime(getCustomFormatDateString(new Date(todoDetail.created)));
  }, [detailId, todos]);

  const startResizeHandler = useCallback(() => {
    setIsResizing(true);
  }, []);

  const finishResizeHandler = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      setSidebarWidth(resizerPosition);
    }
  }, [isResizing, resizerPosition]);

  const resizeHandler = useCallback(
    (event) => {
      if (!isResizing) return;
      let calculatedPosition =
        sidebarRef.current.getBoundingClientRect().right - event.clientX;
      if (calculatedPosition > 700) {
        calculatedPosition = 700;
      }
      if (calculatedPosition < 360) {
        calculatedPosition = 360;
      }
      setResizerPosition(calculatedPosition);
    },
    [isResizing]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", finishResizeHandler);
    return () => {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", finishResizeHandler);
    };
  }, [resizeHandler, finishResizeHandler]);

  const {
    refs: closeTooltipRefs,
    floatingStyles: closeTooltipFloatingStyles,
    context: closeTooltipContext,
  } = useFloating({
    open: closeTooltipOpen,
    onOpenChange: setCloseTooltipOpen,
    placement: "top",
    middleware: [offset(5), flip(), shift({ padding: 10 })],
  });

  const {
    getReferenceProps: getCloseTooltipReferenceProps,
    getFloatingProps: getCloseTooltipFloatingProps,
  } = useInteractions([
    useHover(closeTooltipContext, { delay: { open: 300, close: 0 } }),
    useDismiss(closeTooltipContext, {
      referencePress: true,
    }),
  ]);
  const {
    refs: removeTooltipRefs,
    floatingStyles: removeTooltipFloatingStyles,
    context: removeTooltipContext,
  } = useFloating({
    open: removeTooltipOpen,
    onOpenChange: setRemoveTooltipOpen,
    placement: "top",
    middleware: [offset(5), flip(), shift({ padding: 10 })],
  });

  const {
    getReferenceProps: getRemoveTooltipReferenceProps,
    getFloatingProps: getRemoveTooltipFloatingProps,
  } = useInteractions([
    useHover(removeTooltipContext, { delay: { open: 300, close: 0 } }),
    useDismiss(removeTooltipContext, {
      referencePress: true,
    }),
  ]);

  return (
    <div
      className="flex flex-row min-w-[360px] max-w-[700px] box-border"
      ref={sidebarRef}
      style={{ width: sidebarWidth, transition: "width 180ms ease" }}
    >
      <div
        className={`w-1 absolute h-full m-0 p-0 box-border bg-ms-scrollbar opacity-0 translate-x-1 ${
          (isHover || isResizing) && "opacity-40 cursor-ew-resize"
        } `}
        onMouseDown={startResizeHandler}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{ right: resizerPosition, zIndex: "200" }}
      ></div>

      <div
        className="flex flex-col w-full h-full relative flex-1 box-border"
        style={{
          boxShadow:
            "0px 1.2px 3.6px rgba(0,0,0,0.1), 0px 6.4px 14.4px rgba(0,0,0,0.1)",
        }}
      >
        <Details taskId={detailId} />

        <div className="flex flex-col before:content-[''] before:h-[0.5px] before:w-full before:bg-ms-bg-border before:top-0 before:left-0">
          <div className="flex items-center justify-between py-4 px-0 my-0 mx-6">
            <button
              onClick={closeDetailHandler}
              ref={closeTooltipRefs.setReference}
              {...getCloseTooltipReferenceProps()}
            >
              <LuPanelRightClose size="16px" />
            </button>

            <p className="text-xs" style={{ color: "#605E5C" }}>
              Created {createdTime}
            </p>

            <button
              onClick={() => removeTaskHandler(detailId)}
              ref={removeTooltipRefs.setReference}
              {...getRemoveTooltipReferenceProps()}
            >
              <BsTrash3 size="16px" />
            </button>
          </div>
        </div>
      </div>

      {closeTooltipOpen && (
        <div
          ref={closeTooltipRefs.setFloating}
          {...getCloseTooltipFloatingProps()}
          style={{
            ...closeTooltipFloatingStyles,
            boxShadow:
              "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
            zIndex: 50,
          }}
          className="bg-white py-1.5 rounded-sm px-2 text-xs"
        >
          Hide detail view
        </div>
      )}
      {removeTooltipOpen && (
        <div
          ref={removeTooltipRefs.setFloating}
          {...getRemoveTooltipFloatingProps()}
          style={{
            ...removeTooltipFloatingStyles,
            boxShadow:
              "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
            zIndex: 50,
          }}
          className="bg-white py-1.5 rounded-sm px-2 text-xs"
        >
          Delete task
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
