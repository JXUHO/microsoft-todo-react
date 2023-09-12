import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import { createPortal } from "react-dom";
import { Popper } from "react-popper";

function isInDOMSubtree(element, subtreeRoot) {
  return (
    subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element))
  );
}

const PopperWrapper = forwardRef(
  ({ target, children, toggle, initOpen, ...props }, ref) => {
    const [isVisible, setVisibility] = useState(initOpen || false);
    const [targetElementIsVisible, setTargetElementIsVisible] = useState(false);

    const toggleVisibility = () =>
      setVisibility(prevVisibility => !prevVisibility);

    const elRef = useRef(document.getElementById(target));
    const popperRef = useRef(null);

    useImperativeHandle(ref, () => ({
      setVisibility
    }));

    const legacyClick = e => {
      if (e.target === elRef.current) {
        return toggleVisibility();
      }
      if (isVisible && !isInDOMSubtree(e.target, popperRef.current)) {
        setVisibility(false);
      }
    };

    useEffect(() => {
      elRef.current = document.getElementById(target);

      // HOVER
      if (toggle === "hover") {
        elRef.current.addEventListener("mouseenter", toggleVisibility);
        elRef.current.addEventListener("mouseleave", toggleVisibility);
        return () => {
          elRef.current.removeEventListener("mouseenter", toggleVisibility);
          elRef.current.removeEventListener("mouseleave", toggleVisibility);
        };
      }

      // CLICK
      if (toggle === "click") {
        elRef.current.addEventListener("click", toggleVisibility);
        return () =>
          elRef.current.removeEventListener("click", toggleVisibility);
      }
    }, [target]);

    useEffect(() => {
      // LEGACY
      if (toggle === "legacy") {
        document.addEventListener("click", legacyClick);
        return () => {
          document.removeEventListener("click", legacyClick);
        };
      }
    }, [target, isVisible]);

    useEffect(() => {
      if (elRef.current !== null && !targetElementIsVisible) {
        setTargetElementIsVisible(true);
      }
    }, [elRef.current]);

    return createPortal(
      targetElementIsVisible && isVisible ? (
        <Popper
          innerRef={popper => (popperRef.current = popper)}
          referenceElement={elRef.current}
          {...props}
        >
          {({ ref, style, placement, arrowProps }) => {
            return (
              <div
                className="popover"
                ref={ref}
                style={style}
                data-placement={placement}
              >
                {children}
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            );
          }}
        </Popper>
      ) : null,
      document.body
    );
  }
);

export default PopperWrapper;



/**
 * TODO
 * 코드 이해하기
 * 
 */