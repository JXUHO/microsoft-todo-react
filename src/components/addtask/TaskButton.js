import { useState } from "react";
import classes from "./TaskButton.module.css"

const TaskButton = (props) => {
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <div>
      <button
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={null}
      >
        {event}
      </button>
      {isFocused && <p>{event}</p>}
    </div>
  );
};

export default TaskButton;
