import {
  getCustomFormatDateString,
  getNextMonday9AM,
  getThreeHoursLater,
  getTomorrow9AM,
  formatTimeToAMPM,
} from "../utils/getDates";

const RemindItems = ({
  onItemClick,
  getCalendarReferenceProps,
  onPickADateClick,
  isRemoveReminderButtonShow,
  onRemoveReminderButtonClick,
}) => {
  const laterToday = getThreeHoursLater();
  const laterTodayTimeText = formatTimeToAMPM(laterToday);

  const tomorrow = getTomorrow9AM();
  const tomorrowTimeText =
    tomorrow.toString().slice(0, 3) + ", " + formatTimeToAMPM(tomorrow, false);

  const nextMonday = getNextMonday9AM();
  const nextMondayTimeText =
    nextMonday.toString().slice(0, 3) +
    ", " +
    formatTimeToAMPM(nextMonday, false);

  const addRemindHandler = (option) => {
    switch (option) {
      case "laterToday":
        onItemClick(laterToday);
        break;
      case "tomorrow":
        onItemClick(tomorrow);
        break;
      case "nextWeek":
        onItemClick(nextMonday);
        break;
      default:
        break;
    }
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
          <button
            {...getCalendarReferenceProps({
              onClick() {
                onPickADateClick();
              },
            })}
          >
            Pick a date & time
          </button>
        </li>
        {isRemoveReminderButtonShow && (
          <li>
            <button onClick={onRemoveReminderButtonClick}>
              Remove reiminder
            </button>
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
