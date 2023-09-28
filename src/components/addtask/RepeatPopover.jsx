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
import { useSelector } from "react-redux";
import RepeatItems from "./RepeatItems";
import useRepeatTasks from "../../hooks/useRepeatTasks";
import RepeatCustom from "./RepeatCustom";
import {
  getDayOfWeek,
  getFullDayNames,
  isValidWeekdaysArray,
} from "../utils/getDates";
import {BsRepeat} from 'react-icons/bs'


const RepeatPopover = forwardRef(({ setRepeatRule, repeatRuleValue }, ref) => {
  const tasksStored = useSelector((state) => state.todo.todos);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [repeatButtonText, setRepeatButtonText] = useState("");
  const [showRepeatRemoveButton, setShowRepeatRemoveButton] = useState(false);

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
    refs: customRefs,
    floatingStyles: customFloatingStyles,
    context: customContext,
  } = useFloating({
    open: customOpen,
    onOpenChange: setCustomOpen,
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
    getReferenceProps: getCustomReferenceProps,
    getFloatingProps: getCustomFloatingProps,
  } = useInteractions([useClick(customContext), useDismiss(customContext)]);

  const floatingRef = useMergeRefs([
    tooltipRefs.setReference,
    popoverRefs.setReference,
    customRefs.setReference,
  ]);

  const repeatButtonProps = getTooltipReferenceProps(
    getPopoverReferenceProps({
      onClick() {
        setCustomOpen(false);
      },
    })
  );

  useRepeatTasks(tasksStored);

  const addRepeatHandler = (input) => {
    switch (input) {
      case "daily":
        setRepeatRule("1-day", "repeatRule");
        break;
      case "weekdays":
        setRepeatRule("1-week-mon-tue-wed-thu-fri", "repeatRule");
        break;
      case "weekly":
        const currentDay = getDayOfWeek(new Date());
        setRepeatRule("1-week-" + currentDay, "repeatRule");
        break;
      case "monthly":
        setRepeatRule("1-month", "repeatRule");
        break;
      case "yearly":
        setRepeatRule("1-year", "repeatRule");
        break;
      default:
        break;
    }
    setPopoverOpen(false);
  };

  const resetRepeatHandler = () => {
    setRepeatRule("", "repeatRule");
    setPopoverOpen(false);
  };

  useImperativeHandle(ref, () => ({
    resetRepeat: resetRepeatHandler,
  }));

  const closePopoverHandler = () => {
    setPopoverOpen(false);
  };

  const closeCustomHandler = () => {
    setCustomOpen(false);
  };

  useEffect(() => {
    if (repeatRuleValue) {
      setShowRepeatRemoveButton(true);
      setRepeatButtonText(getRepeatButtonText(repeatRuleValue));
    } else {
      setRepeatButtonText("");
      setShowRepeatRemoveButton(false);
    }
  }, [repeatRuleValue]);

  return (
    <>
      <button ref={floatingRef} {...repeatButtonProps}>
        <BsRepeat/>
        {repeatButtonText}
      </button>

      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            background: "white",
            color: "black",
            padding: 10,
            zIndex: 50,
            border: "1px solid black",
          }}
          {...getTooltipFloatingProps()}
        >
          Repeat
        </div>
      )}

      {customOpen && (
        <div
          ref={customRefs.setFloating}
          {...getCustomFloatingProps()}
          style={{...customFloatingStyles, zIndex: 40}}
        >
          <RepeatCustom
            setRepeatRule={setRepeatRule}
            closeCustom={closeCustomHandler}
          />
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
            zIndex: 40
          }}
          {...getPopoverFloatingProps()}
        >
          <RepeatItems
            onItemClick={addRepeatHandler}
            getCustomReferenceProps={getCustomReferenceProps}
            isNeverRepeatShow={showRepeatRemoveButton}
            onNeverRepeatClick={resetRepeatHandler}
            onCustomClick={closePopoverHandler}
          />
        </div>
      )}
    </>
  );
});

export default RepeatPopover;

// button text helper function
const getRepeatButtonText = (repeatRule) => {
  let repeatButtonText = "Repeat";
  const repeatRuleArr = repeatRule.split("-");

  if (repeatRuleArr[0] === "1") {
    // 1-month, 1-week-mon-tue
    switch (repeatRuleArr[1]) {
      case "day":
        repeatButtonText = "Daily";
        break;
      case "week":
        if (isValidWeekdaysArray(repeatRuleArr.slice(2))) {
          repeatButtonText = "Weekdays";
        } else {
          repeatButtonText =
            "Weekly, " +
            getFullDayNames(repeatRuleArr.slice(2))
              .join(", ")
              .replace(/,([^,]*)$/, " &$1");
        }
        break;
      case "month":
        repeatButtonText = "Monthly";
        break;
      case "year":
        repeatButtonText = "Yearly";
        break;
      default:
        break;
    }
  } else {
    // 2-year, 2-week-mon-tue-fri
    switch (repeatRuleArr[1]) {
      case "day":
        repeatButtonText = "Every " + repeatRuleArr[0] + " days";
        break;
      case "week":
        if (isValidWeekdaysArray(repeatRuleArr.slice(2))) {
          repeatButtonText =
            "Every " + repeatRuleArr[0] + " weeks, " + "Weekdays";
        } else {
          repeatButtonText =
            "Every " +
            repeatRuleArr[0] +
            " weeks, " +
            getFullDayNames(repeatRuleArr.slice(2))
              .join(", ")
              .replace(/,([^,]*)$/, " &$1");
        }
        break;
      case "month":
        repeatButtonText = "Every " + repeatRuleArr[0] + " months";
        break;
      case "year":
        repeatButtonText = "Every " + repeatRuleArr[0] + " years";
        break;
      default:
        break;
    }
  }
  return repeatButtonText;
};

/**
 * TODO
 *
 * useListNavigation 사용해서 키보드로 옵션 선택 가능하도록 만들기
 *
 *
 */
