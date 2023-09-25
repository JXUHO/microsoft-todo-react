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
import { getDayOfWeek } from "../date/getDates";

const RepeatPopover = forwardRef(({ setRepeatRule, repeatValue }, ref) => {
  const tasksStored = useSelector((state) => state.todo.todos);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [repeatButtonText, setRepeatButtonText] = useState("Repeat");
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
        // 오늘 요일 구하고, 1-week뒤에 덧붙임
        const currentDay = getDayOfWeek(new Date())
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
    // setRepeatButtonText(input.charAt(0).toUpperCase() + input.slice(1));
    setPopoverOpen(false);
    setShowRepeatRemoveButton(true);
  };

  const resetRepeatHandler = () => {
    setRepeatButtonText("Repeat");
    setRepeatRule("", "repeatRule");
    setShowRepeatRemoveButton(false);
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
    // repeatValue가 설정되면, 버튼 text 설정
    console.log(repeatValue)
    const repeatValueArr = repeatValue.split("-")
    // interval 1이면 daily, weekly, weekdays, monthly, yearly
    // interval 2이상이면 Every [interval] 반복단위, [선택한 요일]
    let buttonText = "Repeat"
    if (repeatValueArr[0] === "1" && repeatValueArr.length === 2) {  // 1-week
      switch (repeatValueArr[1]) {
        case "day":
          buttonText = "Daily"
          break;
        case "week":
          buttonText = "Weekly"
          break;
        case "month":
          buttonText = "Monthly"
          break;
        case "year":
          buttonText = "Yearly"
          break;    
        default:
          break;
      }
    }
    if (repeatValueArr.length === 2 && repeatValueArr[0] !== "1") {  // 2-week
      
    }
    


    setRepeatButtonText(buttonText)
  }, [repeatValue])



  return (
    <>
      <button ref={floatingRef} {...repeatButtonProps}>
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
            zIndex: 30,
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
          style={customFloatingStyles}
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

/**
 * TODO
 *
 * useListNavigation 사용해서 키보드로 옵션 선택 가능하도록 만들기
 *
 *
 */
