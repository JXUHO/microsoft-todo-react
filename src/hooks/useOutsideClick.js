import React, { useEffect, useRef } from "react";

const useOutsideClick  = ({ onOutsideClick, children }) => {
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

export default useOutsideClick ;
