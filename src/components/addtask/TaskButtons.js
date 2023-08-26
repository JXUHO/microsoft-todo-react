import { useState } from "react";
import Popover from "./Popover";


const buttonsData = [
  { id: "dueDate", label: "Add due date", content: "Popover1" },
  { id: "remind", label: "Remind me", content: "Popover2" },
  { id: "repeat", label: "Repeat", content: "Popover3" },
];

const TaskButtons = () => {
  const [activePopover, setActivePopover] = useState(null);
  const [activeHoverMessage, setActiveHoverMessage] = useState(null);

  const buttonClickHandler = (event, popoverId) => {
    event.stopPropagation();
    setActivePopover(popoverId);
  };

  const closePopoverHandler = () => {
    setActivePopover(null);
  };

  const mouseOverHandler = (popoverId) => {
    setActiveHoverMessage(popoverId);
  };
  const mouseLeaveHandler = () => {
    setActiveHoverMessage(null);
  };


  return (
    <>
      {buttonsData.map((button) => (
        <div key={button.id}>
          <button
            onClick={(e) => buttonClickHandler(e, button.id)}
            onMouseOver={() => mouseOverHandler(button.id)}
            onMouseLeave={() => mouseLeaveHandler()}
          >
            {button.label}
          </button>
          {activeHoverMessage === button.id && <p>message</p>}
          {activePopover === button.id && (
            <Popover onClose={closePopoverHandler}>
              {button.content}
            </Popover>
          )}
        </div>
      ))}
    </>
  );
};

export default TaskButtons;
