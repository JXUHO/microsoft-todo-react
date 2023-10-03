import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useHover,
  useMergeRefs,
} from "@floating-ui/react";
import { useState } from "react";
import { PiFolderSimpleThin } from "react-icons/pi";

const GroupPopover = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

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
    getReferenceProps: getPopoverReferenceProps,
    getFloatingProps: getPopoverFloatingProps,
  } = useInteractions([
    useClick(popoverContext),
    useDismiss(popoverContext, {
      referencePress: true,
    }),
  ]);
  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext,
  } = useFloating({
    open: tooltipOpen,
    placement: 'top',
    onOpenChange: setTooltipOpen,
    middleware: [offset(5), flip(), shift({ padding: 10 })],
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

  const floatingRef = useMergeRefs([
    tooltipRefs.setReference,
    popoverRefs.setReference,
  ]);

  const popoverOpenHandler = () => {
    setPopoverOpen(true);
  };

  return (
    <>
      <div
        className="shrink-0 cursor-pointer px-3 ml-0.5"
        ref={floatingRef}
        onClick={popoverOpenHandler}
        {...getPopoverReferenceProps()}
        {...getTooltipReferenceProps()}
      >
        <div className="flex items-center">
          <PiFolderSimpleThin size="20px" />
          <span className="ml-1 text-sm">Group</span>
        </div>
      </div>
      {popoverOpen && (
        <div
          ref={popoverRefs.setFloating}
          style={{
            ...popoverFloatingStyles,
            zIndex: 40,
          }}
          {...getPopoverFloatingProps()}
        >
          popover
        </div>
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
          Group
        </div>
      )}
    </>
  );
};

export default GroupPopover;
