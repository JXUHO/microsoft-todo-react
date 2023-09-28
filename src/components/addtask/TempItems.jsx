import getLastTimeOfDay, {
  getNextMonday,
} from "../utils/getDates";

const DueItems = ({
  onAddDueDate,
  onClosePopover,
  showRemoveButton,
  resetDue,
  showCalendar,
  ...props
}) => {

  const today = getLastTimeOfDay();
  const todayDayString = today.toString().slice(0, 3);

  const tomorrow = getLastTimeOfDay(1);
  const tomorrowDayString = tomorrow.toString().slice(0, 3);

  const nextMonday = new Date(getNextMonday().setHours(23,59,59));
  const nextMondayDayString = nextMonday.toString().slice(0, 3);

  const addDueDateHandler = (input) => {
    if (input === "today") {
      onAddDueDate(today);
    }
    if (input === "tomorrow") {
      onAddDueDate(tomorrow);
    }
    if (input === "nextWeek") {
      onAddDueDate(nextMonday);
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
            <span>{todayDayString}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler("tomorrow")}>
            <span>Tomorrow </span>
            <span>{tomorrowDayString}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addDueDateHandler("nextWeek")}>
            <span>Next week </span>
            <span>{nextMondayDayString}</span>
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

export default DueItems;

/**
 * TODO
 * (complete)todayDate를 연월일로 잘라서 가공하기
 * addDueDateHandler를 tomorrow, next week에도 붙이기
 *
 *
 *
 */
