import {
  getNextMonday9AM,
  getThreeHoursLater,
  getTomorrow9AM,
  formatTimeToAMPM,
} from "../../utils/getDates";

import { BsTrash3, BsCalendarCheck, BsClock } from "react-icons/bs";

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
    <div
      className="bg-white py-1.5 rounded-sm min-w-[200px] max-w-[290px] animate-slideFadeDown5"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
      }}
    >
      <div
        className="font-semibold text-sm px-2 pt-2 pb-3 text-center mb-1.5"
        style={{ borderBottom: "1px solid #edebe9" }}
      >
        Reminder
      </div>
      <ul>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button onClick={() => addRemindHandler("laterToday")} className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left">
            <div className="flex items-center max-w-full">
              <BsClock style={{ marginLeft: "4px", marginRight: "14px" }} />
              <span className="px-1 py-0 grow">Later today</span>
              <span className="pl-5 text-right" style={{ color: "#797775" }}>{laterTodayTimeText}</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button onClick={() => addRemindHandler("tomorrow")} className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left">
            <div className="flex items-center max-w-full">
              <BsClock style={{ marginLeft: "4px", marginRight: "14px" }} />
              <span className="px-1 py-0 grow">Tomorrow</span>
              <span className="pl-5 text-right" style={{ color: "#797775" }}>{tomorrowTimeText}</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button onClick={() => addRemindHandler("nextWeek")} className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left">
            <div className="flex items-center max-w-full">
              <BsClock style={{ marginLeft: "4px", marginRight: "14px" }} />
              <span className="px-1 py-0 grow">Next week</span>
              <span className="pl-5 text-right" style={{ color: "#797775" }}>{nextMondayTimeText}</span>
            </div>
          </button>
        </li>
        <li
          className="mx-0 my-1.5 h-0 p-0 border-none "
          style={{
            borderBottom: "1px solid #edebe9",
            backgroundColor: "#edebe9",
          }}
        />
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            {...getCalendarReferenceProps({
              onClick() {
                onPickADateClick();
              },
            })}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarCheck
                style={{ marginLeft: "4px", marginRight: "14px" }}
              />
              Pick a date & time
            </div>
          </button>
        </li>
        {isRemoveReminderButtonShow && (
          <>
          <li
          className="mx-0 my-1.5 h-0 p-0 border-none "
          style={{
            borderBottom: "1px solid #edebe9",
            backgroundColor: "#edebe9",
          }}
        />
          <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
            <button onClick={onRemoveReminderButtonClick} className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left">
              <div className="flex items-center max-w-full text-red-600">
                <BsTrash3 style={{ marginLeft: "4px", marginRight: "14px" }} />
                <span className="px-1 py-0 grow">Remove reiminder</span>
              </div>
            </button>
          </li>
          </>
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
