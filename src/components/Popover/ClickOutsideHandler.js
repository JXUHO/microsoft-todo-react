import React, { useEffect, useRef } from "react";

const ClickOutsideHandler  = ({ onOutsideClick, children }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", pageClickEvent);

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [onOutsideClick]);

  return <div ref={elementRef}>{children}</div>;
};

export default ClickOutsideHandler ;


/**
 * title
 * list 
 * divider
 */