import {
  getCustomFormatDateString,
  getNextMonday,
  getThreeHoursLater,
  getTomorrow,
  formatTimeToAMPM,
} from "../date/getDates";

const RemindItems = ({
  onAddRemind,
  onClosePopover,
  showRemoveButton,
  resetRemind,
  showCalendar,
  ...props
}) => {


  const laterToday = getThreeHoursLater();
  const laterTodayTimeText = formatTimeToAMPM(laterToday);

  const tomorrow = getTomorrow();
  const tomorrowTimeText =
    tomorrow.toString().slice(0, 3) + ", " + formatTimeToAMPM(tomorrow, false);

  const nextMonday = getNextMonday();
  const nextMondayTimeText =
    nextMonday.toString().slice(0, 3) +
    ", " +
    formatTimeToAMPM(nextMonday, false);



  const addRemindHandler = (input) => {
    if (input === "laterToday") {
      onAddRemind({
        time: laterToday,
        text: formatTimeToAMPM(laterToday) + ", Today",
      });
    }
    if (input === "tomorrow") {
      onAddRemind({
        time: tomorrow,
        text: formatTimeToAMPM(tomorrow) + ", Tomorrow",
      });
    }
    if (input === "nextWeek") {
      onAddRemind({
        time: nextMonday,
        text:
          formatTimeToAMPM(nextMonday) +
          ", " +
          getCustomFormatDateString(nextMonday),
      });
    }

    onClosePopover();
  };


  const removeRemindHandler = () => {
    resetRemind();
  };


  const calendarOpenHandler = () => {
    showCalendar("remindCalendar");
    onClosePopover();
  };



  return (
    <div>
      <div>Reminder</div>
      <ul>
        <li>
          <button onClick={() => addRemindHandler("laterToday")}>
            <span>Later Today </span>
            <span>{laterTodayTimeText}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addRemindHandler("tomorrow")}>
            <span>Tomorrow </span>
            <span>{tomorrowTimeText}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addRemindHandler("nextWeek")}>
            <span>Next week </span>
            <span>{nextMondayTimeText}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={calendarOpenHandler}>Pick a date & time</button>
        </li>
        {showRemoveButton && (
          <li>
            <button onClick={removeRemindHandler}>Remove reiminder</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RemindItems;

/**
 * TODO
 *
 *
 *
 * later today는 3시간 이후 반올림
 * 시간 선택은 공통적으로 09:00, 12:00, 5:00, 8:00
 * tomorrow는 공통적으로 9:00
 * next week은 공통적으로 9:00
 *
 *
 *
 *
 * 11:50am later today -> 3pm
 *
 * 5am later today -> 8am
 * tomorrow 9am
 * next week 9am
 *
 * 12:14am later today -> 3am
 * tomorrow 9am
 * next week 9am
 *
 * 4:16am later today -> 7am
 *
 *
 *
 */
