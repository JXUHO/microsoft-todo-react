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

import { VscBell } from "react-icons/vsc";
import RemindItems from "./RemindItems";
import { formatTimeToAMPM, getCustomFormatDateString } from "../utils/getDates";
import RemindCalendar from "./RemindCalendar";

const RemindPopover = forwardRef(({ setRemindValue, remindValue }, ref) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [remindButtonText, setRemindButtonText] = useState("");
  const [showRemoveReminderButton, setShowRemoveReminderButton] =
    useState(false);

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

  const remindButtonProps = getTooltipReferenceProps(
    getPopoverReferenceProps({
      onClick() {
        setCalendarOpen(false);
      },
    })
  );

  const addRemindHandler = (dateObj) => {
    setRemindValue(dateObj, "remind");
    setPopoverOpen(false);
  };

  const resetRemindHandler = () => {
    setRemindValue("", "remind");
    setPopoverOpen(false);
  };

  useImperativeHandle(ref, () => ({
    resetRemind: resetRemindHandler,
  }));

  const closePopoverHandler = () => {
    setPopoverOpen(false);
  };

  const calendarSaveButtonHander = (dateObj) => {
    addRemindHandler(dateObj);
    setCalendarOpen(false);
  };

  useEffect(() => {
    if (remindValue) {
      const dateObj = new Date(remindValue);
      setRemindButtonText(
        formatTimeToAMPM(dateObj) +
          ", " +
          getCustomFormatDateString(dateObj, "remind")
      );
      setShowRemoveReminderButton(true);
    } else {
      setRemindButtonText("");
      setShowRemoveReminderButton(false);
    }
  }, [remindValue]);

  return (
    <>
      {remindButtonText ? (
        <button
          ref={floatingRef}
          {...remindButtonProps}
          className="flex items-center bg-white px-2 py-px"
          style={{ border: "1px solid #edebe9", borderRadius: "4px" }}
        >
          <VscBell size="17px" color="#797775" />
          <span className="pl-1">{remindButtonText}</span>
        </button>
      ) : (
        <button
          ref={floatingRef}
          {...remindButtonProps}
          className="flex items-center px-1"
        >
          <VscBell size="17px" color="#797775" />
        </button>
      )}

      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            boxShadow:
              "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
            zIndex: 50,
          }}
          {...getTooltipFloatingProps()}
          className="bg-white py-1.5 rounded-sm px-2 text-xs"
        >
          Remind me
        </div>
      )}

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
            isRemoveReminderButtonShow={showRemoveReminderButton}
            onRemoveReminderButtonClick={resetRemindHandler}
          />
        </div>
      )}
    </>
  );
});

export default RemindPopover;
