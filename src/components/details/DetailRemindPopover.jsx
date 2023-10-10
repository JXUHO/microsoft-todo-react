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
import { VscBell } from "react-icons/vsc";
import RemindItems from "../addtask/RemindItems";
import {
  formatTimeToAMPM,
  getCustomFormatDateString,
} from "../../utils/getDates";
import RemindCalendar from "../addtask/RemindCalendar";
import { useDispatch, useSelector } from "react-redux";
import { changeOptionTodo } from "../../store/todoSlice";
import { BsXLg } from "react-icons/bs";

const DetailRemindPopover = ({ taskId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [remindText, setRemindText] = useState({ date: "", time: "" });
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
    refs: calendarRefs,
    floatingStyles: calendarFloatingStyles,
    context: calendarContext,
  } = useFloating({
    open: calendarOpen,
    onOpenChange: setCalendarOpen,
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
    getReferenceProps: getCalendarReferenceProps,
    getFloatingProps: getCalendarFloatingProps,
  } = useInteractions([useClick(calendarContext), useDismiss(calendarContext)]);

  const floatingRef = useMergeRefs([
    popoverRefs.setReference,
    calendarRefs.setReference,
  ]);

  const remindButtonProps = getPopoverReferenceProps({
    onClick() {
      setCalendarOpen(false);
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

  const addRemindHandler = (dateObj) => {
    const content = dateObj.toISOString();
    // 선택한 dateObj의 isoString을 해당 task remind에 저장함
    dispatch(changeOptionTodo({ id: taskId, option: "remind", content }));
    setPopoverOpen(false);
  };

  const resetRemindHandler = () => {
    // 해당 task remind를 empty string으로 변경함
    dispatch(changeOptionTodo({ id: taskId, option: "remind", content: "" }));
    setPopoverOpen(false);
  };

  const closePopoverHandler = () => {
    setPopoverOpen(false);
  };

  const calendarSaveButtonHander = (dateObj) => {
    addRemindHandler(dateObj);
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (todo.remind) {
      const dateObj = new Date(todo.remind);
      setRemindText({
        date: getCustomFormatDateString(dateObj, "remind"),
        time: formatTimeToAMPM(dateObj),
      });
    }
  }, [todo.remind]);

  return (
    <>
      <div
        className="flex bg-white w-full items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
        style={{ borderBottom: "solid 0.5px #edebe9" }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {todo.remind ? (
          <div className="flex w-full px-4 py-2" style={{ color: "#2564cf" }}>
            <div
              className="flex items-center"
              ref={floatingRef}
              {...remindButtonProps}
            >
              <VscBell size="17px" color="#2564cf" />
              <div className="mx-4">
                <div>Remind me at {remindText.time}</div>
                <div className="text-xs" style={{ color: "#605E5C" }}>
                  {remindText.date}
                </div>
              </div>
            </div>
            {isHover && (
              <button
                onClick={resetRemindHandler}
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
            {...remindButtonProps}
          >
            <VscBell size="17px" color="#797775" />
            <span className="mx-4">Remind me</span>
          </div>
        )}
      </div>

      {calendarOpen && (
        <div
          ref={calendarRefs.setFloating}
          {...getCalendarFloatingProps()}
          style={{ ...calendarFloatingStyles, zIndex: 40 }}
        >
          <RemindCalendar onCalendarSaveClick={calendarSaveButtonHander} />
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
          <RemindItems
            onItemClick={addRemindHandler}
            getCalendarReferenceProps={getCalendarReferenceProps}
            onPickADateClick={closePopoverHandler}
            isRemoveReminderButtonShow={false}
            onRemoveReminderButtonClick={resetRemindHandler}
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
          Remove reminder
        </div>
      )}
    </>
  );
};

export default DetailRemindPopover;
