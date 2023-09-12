// old version
import { useState } from "react";
import ClickOutsideHandler from "../Popover/ClickOutsideHandler";


const TaskButton = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverShown, setIsPopoverShown] = useState(false);

  const mouseOverHandler = () => {
    setIsFocused(true);
  };
  const mouseLeaveHandler = () => {
    setIsFocused(false);
  };

  const popoverOpenHandler = (event) => {
    event.stopPropagation();
    setIsPopoverShown(true);
  };

  const popoverCloseHandler = () => {
    setIsPopoverShown(false);
  };

  return (
    <div>
      <button
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={popoverOpenHandler}
      >
        {props.buttonDetail.image}
      </button>
      {isFocused && <p style={{position: "absolute"}}>{props.buttonDetail.hover}</p>}
      {isPopoverShown && (
        <ClickOutsideHandler onClick={popoverCloseHandler}>
          {props.children}
        </ClickOutsideHandler>
      )}
    </div>
  );
};

export default TaskButton;


/**
 * 버튼을 누르면 popover를 연다 -> props.children
 * hover하면 tooltip을 연다
 * 
 * 버튼이름(이미지) / hover 이름 만 props로 받아옴
 * 
 * TODO
 * react-popover git에서 까서 분해해보기
 * 
 */