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
import { useDispatch, useSelector } from "react-redux";
import RepeatItems from "./RepeatItems";
import useRepeatTasks from "../../hooks/useRepeatTasks";
import RepeatCustom from "./RepeatCustom";

const RepeatPopover = forwardRef(({ setRepeatRule }, ref) => {
  const dispatch = useDispatch();
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
        setRepeatRule("1-week", "repeatRule");
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
    setRepeatButtonText(input.charAt(0).toUpperCase() + input.slice(1));
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
          <RepeatCustom />
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
