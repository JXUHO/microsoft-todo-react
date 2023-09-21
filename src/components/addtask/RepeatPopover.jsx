import {
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
} from "@floating-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";

const RepeatPopover = forwardRef(({ setRepeatRule }, ref) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

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


  
  const [repeatButtonText, setRepeatButtonText] = useState("Repeat")
  const [showRepeatRemoveButton, setShowRepeatRemoveButton] = useState(false);


  // redux repeat정보를 가지고 온 후, useEffect dependency에 넣고, repeat이 업데이트되면 새로운 task를 imperative하게 만들기
  // 생성된 날짜가 오늘이거나 or due가 오늘이면 myday true;
  // repeat은 duedate를 기준으로 작동함.



  const addRepeatHandler = (input) => {
    switch (input) {
      case "daily":
        setRepeatRule("1-day", "repeatRule")
        break;
      case "weekdays":
        setRepeatRule("1-week-mon-tue-wed-thu-fri", "repeatRule")
        break;
      case "weekly":
        setRepeatRule("1-week", "repeatRule")
        break;
      case "monthly":
        setRepeatRule("1-month", "repeatRule")
        break;
      case "yearly":
        setRepeatRule("1-year", "repeatRule")
        break;
      default:
        break;
    }
    setRepeatButtonText(input.charAt(0).toUpperCase() + input.slice(1));
    setPopoverOpen(false)
    setShowRepeatRemoveButton(true)
  };
    

  const resetRepeatHandler = () => {
    setRepeatButtonText("Repeat")
    setRepeatRule("", "repeatRule")
    setShowRepeatRemoveButton(false)
    setPopoverOpen(false)
  }

  useImperativeHandle(ref, () => ({
    resetRepeat: resetRepeatHandler
  }));


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
            border: "solid",
          }}
          {...getTooltipFloatingProps()}
        >
          Tooltip
        </div>
      )}

      {customOpen && (
        <div
          ref={customRefs.setFloating}
          {...getCustomFloatingProps()}
          style={customFloatingStyles}
        >
          custom component
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
          <div>
            <div>Repeat</div>
            <ul>
              <li>
                <button onClick={() => addRepeatHandler("daily")}>
                  <span>Daily</span>
                </button>
              </li>
              <li>
                <button onClick={() => addRepeatHandler("weekdays")}>
                  <span>Weekdays</span>
                </button>
              </li>
              <li>
                <button onClick={() => addRepeatHandler("weekly")}>
                  <span>Weekly</span>
                </button>
              </li>
              <li>
                <button onClick={() => addRepeatHandler("monthly")}>
                  <span>Monthly</span>
                </button>
              </li>
              <li>
                <button onClick={() => addRepeatHandler("yearly")}>
                  <span>Yearly</span>
                </button>
              </li>
              <li>----------------</li>
              <li>
                <button
                  {...getCustomReferenceProps({
                    onClick() {
                      setPopoverOpen(false);
                    },
                  })}
                >
                  Custom
                </button>
              </li>
              {showRepeatRemoveButton && (
                <li>
                  <button onClick={resetRepeatHandler}>Never repeat</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
})

export default RepeatPopover;

/**
 * TODO
 *
 * Custom component 만들고, 설정 만들기
 *
 *
 *
 *
 * useListNavigation 사용해서 키보드로 옵션 선택 가능하도록 만들기
 *
 *
 */
