import {
  offset,
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
    middleware: [offset(15)],
  });

  const {
    refs: popoverRefs,
    floatingStyles: popoverFloatingStyles,
    context: popoverContext,
  } = useFloating({
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    middleware: [offset(15)],
  });

  const {
    refs: calendarRefs,
    floatingStyles: calendarFloatingStyles,
    context: calendarContext,
  } = useFloating({
    open: calendarOpen,
    onOpenChange: setCalendarOpen,
    middleware: [offset(15)],
  });

  const {
    getReferenceProps: getTooltipReferenceProps,
    getFloatingProps: getTooltipFloatingProps,
  } = useInteractions([
    useHover(tooltipContext),
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
    // date object
    setDueButtonText(getCustomFormatDateString(dateObj));
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
      setDueButtonText(getCustomFormatDateString(new Date(dueDateValue)));
    } else {
      setDueButtonText("");
      setShowDueRemoveButton(false);
    }
  }, [dueDateValue]);

  return (
    <>
      <button ref={floatingRef} {...dueButtonProps}>
        <IoCalendarOutline size="16px" />
        {dueButtonText}
      </button>

      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            background: "white",
            color: "black",
            padding: 10,
            zIndex: 30,
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
            background: "white",
            border: "1px solid black",
            padding: 10,
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
