import getLastTimeOfDay, {
  getCustomFormatDateString,
  getNextMonday,
} from "../date/getDate";

const DueDate = ({
  onAddDueDate,
  onClosePopover,
  showRemoveButton,
  resetDue,
  showCalendar,
  ...props
}) => {

  const today = getLastTimeOfDay();
  const todayText = today.toString().slice(0, 3);

  const tomorrow = getLastTimeOfDay(1);
  const tomorrowText = tomorrow.toString().slice(0, 3);

  const nextMonday = new Date(getNextMonday().setHours(23,59,59));
  const nextMondayText = nextMonday.toString().slice(0, 3);

  const addDueDateHandler = (input) => {
    if (input === "today") {
      onAddDueDate({ date: today, text: "Today" });
    }
    if (input === "tomorrow") {
      onAddDueDate({ date: tomorrow, text: "Tomorrow" });
    }
    if (input === "nextWeek") {
      onAddDueDate({
        date: nextMonday,
        text: getCustomFormatDateString(nextMonday),
      });
    }
    onClosePopover();
  };


  const calendarOpenHandler = () => {
    showCalendar("dueCalendar");
    onClosePopover();
  };


  const removeDueHandler = () => {
    resetDue();
  };


  return (
    <div>
      <div>Due</div>
      <ul>
        <li>
          <button onClick={() => addDueDateHandler("today")}>
            <span>Today </span>
            <span>{todayText}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler("tomorrow")}>
            <span>Tomorrow </span>
            <span>{tomorrowText}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler("nextWeek")}>
            <span>Next week </span>
            <span>{nextMondayText}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={calendarOpenHandler}>Pick a date</button>
        </li>
        {showRemoveButton && (
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
