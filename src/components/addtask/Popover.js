import React, { useEffect, useRef } from "react";

const Popover =({ onClose, children }) => {
  console.log("Popover")
  const popoverRef = useRef(null);

  useEffect(() => {
    
    const pageClickEvent = (event) => { 
      console.log("eventlistener triggerd")
      if (popoverRef.current !== event.target) { 
        onClose();
      }
    };

    document.addEventListener("click", pageClickEvent); 
    

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [onClose]);

  return <div ref={popoverRef}>{children}</div>;
}

export default Popover;


/**
 * 재사용 고려된 component이므로 UI 디렉토리로 이동할것.
 * 
 * addEventListener capture option true 공부하기. 왜 필요한지
 * 
 * 
 */