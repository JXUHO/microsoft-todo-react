import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
} from "@floating-ui/react";
import { useEffect, useState } from "react";
import { getDayOfWeek } from "../../utils/getDates";
import { useDispatch, useSelector } from "react-redux";
import { changeOptionTodo } from "../../store/todoSlice";
import { BsRepeat, BsXLg } from "react-icons/bs";
import RepeatCustom from "../addtask/RepeatCustom";
import RepeatItems from "../addtask/RepeatItems";

import { getRepeatButtonText } from "../addtask/RepeatPopover";

const DetailRepeatPopover = ({ taskId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [repeatText, setRepeatText] = useState({ title: "", description: "" });
  const [isHover, setIsHover] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const dispatch = useDispatch();
  const todo = useSelector((state) =>
    state.todo.todos.find((todo) => todo.id === taskId)
  );

  const {
    refs: popoverRefs,
    floatingStyles: popoverFloatingStyles,
    context: popoverContext,
  } = useFloating({
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    middleware: [offset(5), flip(), shift({ padding: 10 })],
  });

  const {
    refs: customRefs,
    floatingStyles: customFloatingStyles,
    context: customContext,
  } = useFloating({
    open: customOpen,
    onOpenChange: setCustomOpen,
    middleware: [offset(15), flip(), shift({ padding: 10 })],
  });

  const {
    getReferenceProps: getPopoverReferenceProps,
    getFloatingProps: getPopoverFloatingProps,
  } = useInteractions([
    useClick(popoverContext),
    useDismiss(popoverContext, {
      referencePress: true,
    }),
  ]);

  const {
    getReferenceProps: getCustomReferenceProps,
    getFloatingProps: getCustomFloatingProps,
  } = useInteractions([useClick(customContext), useDismiss(customContext)]);

  const floatingRef = useMergeRefs([
    popoverRefs.setReference,
    customRefs.setReference,
  ]);

  const repeatButtonProps = getPopoverReferenceProps({
    onClick() {
      setCustomOpen(false);
    },
  });

  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext,
  } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    placement: "top",
    middleware: [offset(-3), flip(), shift({ padding: 10 })],
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

  const addRepeatHandler = (input) => {
    switch (input) {
      case "daily":
        dispatch(
          changeOptionTodo({
            id: taskId,
            content: "1-day",
            option: "repeatRule",
          })
        );
        break;
      case "weekdays":
        dispatch(
          changeOptionTodo({
            id: taskId,
            content: "1-week-mon-tue-wed-thu-fri",
            option: "repeatRule",
          })
        );
        break;
      case "weekly":
        const currentDay = getDayOfWeek(new Date());
        dispatch(
          changeOptionTodo({
            id: taskId,
            content: "1-week-" + currentDay,
            option: "repeatRule",
          })
        );
        break;
      case "monthly":
        dispatch(
          changeOptionTodo({
            id: taskId,
            content: "1-month",
            option: "repeatRule",
          })
        );
        break;
      case "yearly":
        dispatch(
          changeOptionTodo({
            id: taskId,
            content: "1-year",
            option: "repeatRule",
          })
        );
        break;
      default:
        break;
    }
    setPopoverOpen(false);
  };

  const resetRepeatHandler = () => {
    dispatch(
      changeOptionTodo({ id: taskId, option: "repeatRule", content: "" })
    );
    setPopoverOpen(false);
  };

  const closePopoverHandler = () => {
    setPopoverOpen(false);
  };

  const setRepeatRule = (content, option) => {
    dispatch(changeOptionTodo({ id: taskId, option, content }));
  };

  useEffect(() => {
    const repeatButtonText = getRepeatButtonText(todo.repeatRule).split(",");
    setRepeatText({
      title: repeatButtonText[0],
      description: repeatButtonText.slice(1).join(","),
    });
  }, [todo.repeatRule]);

  return (
    <>
      <div
        className="flex bg-white w-full items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
        style={{ borderBottom: "solid 0.5px #edebe9" }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {todo.repeatRule ? (
          <div className={`flex w-full ${repeatText.description ? "px-4 py-2" : "p-4"}`} style={{ color: "#2564cf"}}>
            <div
              className="flex items-center flex-auto"
              ref={floatingRef}
              {...repeatButtonProps}
            >
              <BsRepeat size="17px" color="#2564cf" />
              <div className="mx-4">
                <div>{repeatText.title}</div>
                <div style={{fontSize:"11px", color:"#292827"}}>{repeatText.description}</div>
              </div>
            </div>
            {isHover && (
              <button
                onClick={resetRepeatHandler}
                className="ml-auto"
                ref={tooltipRefs.setReference}
                {...getTooltipReferenceProps()}
              >
                <BsXLg size="16px" style={{ paddingRight: "2px" }} />
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full items-center p-4"
            ref={floatingRef}
            {...repeatButtonProps}
          >
            <BsRepeat size="17px" color="#797775" />
            <span className="mx-4">Repeat</span>
          </div>
        )}
      </div>

      {customOpen && (
        <div
          ref={customRefs.setFloating}
          {...getCustomFloatingProps()}
          style={{ ...customFloatingStyles, zIndex: 40 }}
        >
          <RepeatCustom
            setRepeatRule={setRepeatRule}
            closeCustom={() => setCustomOpen(false)}
          />
        </div>
      )}

      {popoverOpen && (
        <div
          ref={popoverRefs.setFloating}
          style={{
            ...popoverFloatingStyles,
            zIndex: 40,
          }}
          {...getPopoverFloatingProps()}
        >
          <RepeatItems
            onItemClick={addRepeatHandler}
            getCustomReferenceProps={getCustomReferenceProps}
            isNeverRepeatShow={false}
            onNeverRepeatClick={resetRepeatHandler}
            onCustomClick={closePopoverHandler}
          />
        </div>
      )}

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
          Remove recurrence
        </div>
      )}
    </>
  );
};

export default DetailRepeatPopover;

/**
 * TODO
 * 활성화됐을 때 버튼 전체 클릭 가능하도록 수정하기
 *
 *
 */
