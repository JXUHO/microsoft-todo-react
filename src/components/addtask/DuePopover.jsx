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
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { IoCalendarOutline } from "react-icons/io5";
import DueItems from "./DueItems";
import { getCustomFormatDateString } from "../utils/getDates";
import DueCalendar from "./DueCalendar";

const DuePopover = forwardRef(({ setDueDateValue, dueDateValue }, ref) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dueButtonText, setDueButtonText] = useState("");
  const [showDueRemoveButton, setShowDueRemoveButton] = useState(false);

  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext,
  } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    middleware: [offset(15), flip(), shift({ padding: 10 })],
  });

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
    getReferenceProps: getTooltipReferenceProps,
    getFloatingProps: getTooltipFloatingProps,
  } = useInteractions([
    useHover(tooltipContext, { delay: { open: 200, close: 0 } }),
    useDismiss(tooltipContext, {
      referencePress: true,
    }),
  ]);

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
    tooltipRefs.setReference,
    popoverRefs.setReference,
    calendarRefs.setReference,
  ]);

  const dueButtonProps = getTooltipReferenceProps(
    getPopoverReferenceProps({
      onClick() {
        setCalendarOpen(false);
      },
    })
  );

  const addDueDateHandler = (dateObj) => {
    setDueDateValue(dateObj, "dueDate");
    setPopoverOpen(false);
  };

  const resetDueHandler = () => {
    setDueDateValue("", "dueDate");
    setPopoverOpen(false);
  };

  useImperativeHandle(ref, () => ({
    resetDue: resetDueHandler,
    setDue: addDueDateHandler,
  }));

  const closePopoverHandler = () => {
    setPopoverOpen(false);
  };

  const calendarSaveButtonHander = (dateObj) => {
    addDueDateHandler(dateObj);
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (dueDateValue) {
      setShowDueRemoveButton(true);
      setDueButtonText(getCustomFormatDateString(new Date(dueDateValue), "dueDate"));
    } else {
      setDueButtonText("");
      setShowDueRemoveButton(false);
    }
  }, [dueDateValue]);

  return (
    <>
      {dueButtonText ? (
        <button
          ref={floatingRef}
          {...dueButtonProps}
          className="flex items-center bg-white px-2 py-px"
          style={{ border: "1px solid #edebe9", borderRadius: "4px" }}
        >
          <IoCalendarOutline size="16px" color="#797775" />
          <span className="pl-1">{dueButtonText}</span>
        </button>
      ) : (
        <button ref={floatingRef} {...dueButtonProps} className="flex items-center px-1">
          <IoCalendarOutline size="16px" color="#797775" />
        </button>
      )}

      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            background: "white",
            color: "black",
            padding: 10,
            border: "1px solid black",
            zIndex: 50,
          }}
          {...getTooltipFloatingProps()}
        >
          Add due date
        </div>
      )}

      {calendarOpen && (
        <div
          ref={calendarRefs.setFloating}
          {...getCalendarFloatingProps()}
          style={{ ...calendarFloatingStyles, zIndex: 40 }}
        >
          <DueCalendar onCalendarSaveClick={calendarSaveButtonHander} />
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
          <DueItems
            onItemClick={addDueDateHandler}
            getCalendarReferenceProps={getCalendarReferenceProps}
            onPickADateClick={closePopoverHandler}
            isRemoveDueButtonShow={showDueRemoveButton}
            onRemoveDueButtonClick={resetDueHandler}
          />
        </div>
      )}
    </>
  );
});

export default DuePopover;

/**
 * TODO
 * floating ui 화면 밖으로 나가는것 처리하기
 *
 */
