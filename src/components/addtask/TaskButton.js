import { useState } from "react";
import Popover from "./Popover";

const TaskButton = (props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverShown, setIsPopoverShown] = useState(false);

  const mouseOverHandler = () => {
    setIsFocused(true);
  };
  const mouseLeaveHandler = () => {
    setIsFocused(false);
  };

  
  let event = "";
  if (props.event === "dueDate") {
    event = "Add due date";
  } else if (props.event === "remind") {
    event = "Remind me";
  } else if (props.event === "repeat") {
    event = "Repeat";
  }

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
        onClick={(popoverOpenHandler)}
      >
        {event}
      </button>
      {isFocused && <p>{event}</p>}
      {isPopoverShown && (
        <Popover isOpen={isPopoverShown} onClose={popoverCloseHandler}>
          hello
        </Popover>
      )}
    </div>
  );
};

export default TaskButton;
