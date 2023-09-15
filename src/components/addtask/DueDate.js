import { useEffect, useState } from "react";
import getDateWithOffset, { getCustomFormatDateString, getNextMonday } from "../date/getDate";

const DueDate = (props) => {
  const [offset, setOffset] = useState();

  const dayToday = getDateWithOffset().toString().slice(0, 3);
  const dayTomorrow = getDateWithOffset(1).toString().slice(0, 3);


  const nextMonday = getNextMonday()
  const dayNextMon = nextMonday.toString().slice(0, 3);

  const addDueDateHandler = (offset) => {
    const date = new Date();
    const dueDate = getDateWithOffset(offset);
    if (
      dueDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
    ) {
      props.onAddDueDate({ date: dueDate, text: "Today" });
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (
      dueDate.toISOString().slice(0, 10) === tomorrow.toISOString().slice(0, 10)
    ) {
      props.onAddDueDate({ date: dueDate, text: "Tomorrow" });
    }

    if (
      dueDate.toISOString().slice(0, 10) ===
      nextMonday.toISOString().slice(0, 10)
    ) {
      props.onAddDueDate({
        date: dueDate,
        text: getCustomFormatDateString(dueDate),
      });
    }

    props.onClosePopover();
  };

  const calendarOpenHandler = () => {
    props.showCalendar("due")
    props.onClosePopover();
  };

  useEffect(() => {
    const date = new Date();
    setOffset((8 - date.getDay()) % 7);
  }, []);

  const removeDueHandler = () => {
    props.resetDue()
  };

  return (
    <div>
      <div>Due</div>
      <ul>
        <li>
          <button onClick={() => addDueDateHandler(0)}>
            <span>Today </span>
            <span>{dayToday}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler(1)}>
            <span>Tomorrow </span>
            <span>{dayTomorrow}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler(offset)}>
            <span>Next week </span>
            <span>{dayNextMon}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={calendarOpenHandler}>Pick a date</button>
        </li>
        {props.showRemoveButton && (
          <li>
            <button onClick={removeDueHandler}>Remove due date</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DueDate;

/**
 * TODO
 * (complete)todayDate를 연월일로 잘라서 가공하기
 * addDueDateHandler를 tomorrow, next week에도 붙이기
 *
 *
 *
 */
