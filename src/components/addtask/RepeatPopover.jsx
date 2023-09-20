import {
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
} from "@floating-ui/react";
import { useState } from "react";

function RepeatPopover() {
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
    middleware: [offset(15)]
  });

  const {
    refs: popoverRefs,
    floatingStyles: popoverFloatingStyles,
    context: popoverContext,
  } = useFloating({
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    middleware: [offset(15)]
  });

  const {
    refs: customRefs,
    floatingStyles: customFloatingStyles,
    context: customContext,
  } = useFloating({
    open: customOpen,
    onOpenChange: setCustomOpen,
    middleware: [offset(15)]
  });

  const {
    getReferenceProps: getTooltipReferenceProps,
    getFloatingProps: getTooltipFloatingProps,
  } = useInteractions([useHover(tooltipContext), useDismiss(tooltipContext)]);

  const {
    getReferenceProps: getPopoverReferenceProps,
    getFloatingProps: getPopoverFloatingProps,
  } = useInteractions([useClick(popoverContext), useDismiss(popoverContext)]);

  const {
    getReferenceProps: getCustomReferenceProps,
    getFloatingProps: getCustomFloatingProps,
  } = useInteractions([useClick(customContext), useDismiss(customContext)]);

  const ref = useMergeRefs([
    tooltipRefs.setReference,
    popoverRefs.setReference,
    customRefs.setReference,
  ]);

  const props = getTooltipReferenceProps(getPopoverReferenceProps());

  return (
    <>
      <button ref={ref} {...props}>
        Repeat
      </button>
      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            background: "black",
            color: "white",
            padding: 10,
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
                <button onClick={null}>
                  <span>Daily</span>
                </button>
              </li>
              <li>
                <button onClick={null}>
                  <span>Weekdays</span>
                </button>
              </li>
              <li>
                <button onClick={null}>
                  <span>Weekly</span>
                </button>
              </li>
              <li>
                <button onClick={null}>
                  <span>Monthly</span>
                </button>
              </li>
              <li>
                <button onClick={null}>
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
              {null && (
                <li>
                  <button onClick={null}>Never repeat</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default RepeatPopover;

/**
 * TODO
 *
 * 버튼 누르면 비활성화가 아니라, 다시 활성화 되도록 만들기
 *
 *
 *
 *
 *
 */
