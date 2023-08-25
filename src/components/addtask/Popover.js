import React, { useEffect, useRef } from "react";

const Popover =({ onClose, children }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    
    const pageClickEvent = (event) => { 
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
 * addEventListener capture option "true" 공부하기. 왜 필요한지 -> propagation과 관련있음
 * event listener의 click event는 mousedown + mouseup event이기 때문에 event가 두번 발생함? ㄴㄴ
 * 
 */