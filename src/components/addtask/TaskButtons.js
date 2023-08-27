import { useState } from "react";
import ClickOutsideHandler from "../Popover/ClickOutsideHandler";
import DueDate from "../Popover/DueDate";
import classes from "./TaskButtons.module.css";



const TaskButtons = (props) => {
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



  const buttonsData = [
    { id: "dueDate", tooltipLabel: "Add due date", content: <DueDate onAddDetail={props.onAddDetail}/> }, // DueDate에서 지정되면 해당하는 버튼으로 Label 변경
    { id: "remind", tooltipLabel: "Remind me", content: "Popover2" },
    { id: "repeat", tooltipLabel: "Repeat", content: "Popover3" },
  ];

  return (
    <>
      {buttonsData.map((button) => (
        <div key={button.id} className={classes.TaskButtons}>
          <button
            onClick={(e) => buttonClickHandler(e, button.id)}
            onMouseOver={() => mouseOverHandler(button.id)}
            onMouseLeave={() => mouseLeaveHandler()}
          >
            {button.tooltipLabel}
          </button>
          {activeHoverMessage === button.id && <p style={{position: "absolute"}}>{button.tooltipLabel}</p>}
          {activePopover === button.id && (
            <ClickOutsideHandler onClick={closePopoverHandler}>
              <div>{button.content}</div>
            </ClickOutsideHandler>
          )}
        </div>
      ))}
    </>
  );
};

export default TaskButtons;

/**
 * popover children으로 넘길 component 정의하기
 * tooltip 추가하기 - hover하면 나오는 메세지 컴포넌트 추가
 *
 * 
 * 
 * 깔끔한 설계가 아닌것같음... 
 * 근데 버튼 눌렀을 때, 다른 버튼 안눌리도록 state로 관리하려니까
 * 하나의 component에서 세 개의 component 관리하도록 됐음
 * 
 */
