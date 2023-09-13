import { useEffect, useState } from "react";
import getDate, { getCustomFormatDateString } from "../date/getDate";

const DueDate = (props) => {
  const [offset, setOffset] = useState();
  const dayToday = getDate().toString().slice(0, 3);
  const dayTomorrow = getDate(1).toString().slice(0, 3);

  const date = new Date();
  const daysUntilNextMonday = (8 - date.getDay()) % 7;
  const nextMonday = new Date(date);
  nextMonday.setDate(date.getDate() + daysUntilNextMonday);
  const dayNextMon = nextMonday.toString().slice(0, 3);

  const addDateHandler = (offset) => {
    const date = new Date();
    const dueDate = getDate(offset);
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
    // duedate close. canlender render.
    console.log("open calendar");
    props.onClosePopover();
  };

  useEffect(() => {
    const date = new Date();
    setOffset((8 - date.getDay()) % 7);
  }, []);

  return (
    <div>
      <div>Due</div>
      <ul>
        <li>
          <button onClick={() => addDateHandler(0)}>
            <span>Today </span>
            <span>{dayToday}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDateHandler(1)}>
            <span>Tomorrow </span>
            <span>{dayTomorrow}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDateHandler(offset)}>
            <span>Next week </span>
            <span>{dayNextMon}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={calendarOpenHandler}>Pick a date</button>
        </li>
      </ul>
    </div>
  );
};

export default DueDate;

/**
 * TODO
 * (complete)todayDate를 연월일로 잘라서 가공하기
 * addDateHandler를 tomorrow, next week에도 붙이기
 *
 *
 *
 */
