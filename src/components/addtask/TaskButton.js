import { useState, useCallback } from "react";
import Popover from "./Popover"

const TaskButton = (props) => {
  console.log("taskbutton")
  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverShown, setIsPopoverShown] = useState(false)

  const mouseOverHandler = () => {
    setIsFocused(true);
  };
  const mouseLeaveHandler = () => {
    setIsFocused(false);
  };

  // props.event에 따라 Popover child component도 분기처리할것
  let event = "";
  if (props.event === "dueDate") {
    event = "Add due date";
  } else if (props.event === "remind") {
    event = "Remind me";
  } else if (props.event === "repeat") {
    event = "Repeat";
  }

  const popoverOpenHandler = () => {
    setIsPopoverShown(true)
  } 

  const popoverCloseHandler = () => {
    setIsPopoverShown(false)
  }


  return (
    <div>
      <button
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={popoverOpenHandler}
      >
        {event}
      </button>
      {isFocused && <p>{event}</p>}
      {isPopoverShown && <Popover onClose={popoverCloseHandler}>hello</Popover>}
    </div>
  );
};

export default TaskButton;

/**
 * 1. button 누르면 isPopoverShown true -> Popover render
 * 
 */