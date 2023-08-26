import React, { useEffect, useRef } from "react";

const Popover = ({ onClose, children }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", pageClickEvent);

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [onClose]);

  return <div ref={popoverRef}>{children}</div>;
};

export default Popover;
/**
 * 재사용 고려된 component이므로 UI 디렉토리로 이동할것.
 *
 *
 * 다른 버튼 눌러도 종료될것
 *
 *
 */
