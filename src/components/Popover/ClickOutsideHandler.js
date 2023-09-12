import React, { useEffect, useRef } from "react";

const ClickOutsideHandler  = ({ onClick, children }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener("click", pageClickEvent);

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [onClick]);

  return <div ref={elementRef}>{children}</div>;
};

export default ClickOutsideHandler ;


/**
 * title
 * list 
 * divider
 */