import { useEffect, useState } from "react";
import { getCustomFormatDateString, getNextMonday, getThreeHoursLater, getTomorrow, formatTimeToAMPM } from "../date/getDate";

const Reminder = ({
  onAddRemind,
  onClosePopover,
  showRemoveButton,
  resetRemind,
  showCalendar,
  ...props
}) => {


  const laterToday = getThreeHoursLater()
  const laterTodayTimeString = formatTimeToAMPM(laterToday); 
  const tomorrow = getTomorrow()
  const tomorrowTimeString = tomorrow.toString().slice(0, 3) + ", " + formatTimeToAMPM(tomorrow, false)
  const nextMonday = getNextMonday()
  const nextMondayTimeString = nextMonday.toString().slice(0,3) + ", " + formatTimeToAMPM(nextMonday, false)




  const addRemindHandler = (input) => {

    if (input === "laterToday") {
      onAddRemind({time: laterToday, text: formatTimeToAMPM(laterToday) + ", Today"})  // text는 클릭했을때 버튼 텍스트
    } 

    if (input === "tomorrow") {
      onAddRemind({time: tomorrow, text: formatTimeToAMPM(tomorrow) + ", Tomorrow"})
    } 

    if (input === "nextWeek") {
      onAddRemind({time: nextMonday, text: formatTimeToAMPM(nextMonday) +", "+ getCustomFormatDateString(nextMonday)})
    }

    onClosePopover()
  }
  

  const removeRemindHandler = () => {
    resetRemind()
  }



  const calendarOpenHandler = () => {
    showCalendar("remind")
    onClosePopover();
  };


  return (
    <div>
      <div>Reminder</div>
      <ul>
        <li>
          <button onClick={() => addRemindHandler("laterToday")}>
            <span>Later Today </span>
            <span>{laterTodayTimeString}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addRemindHandler("tomorrow")}>
            <span>Tomorrow </span>
            <span>{tomorrowTimeString}</span>
          </button>
        </li>
        <li>
          <button onClick={() => addRemindHandler("nextWeek")}>
            <span>Next week </span>
            <span>{nextMondayTimeString}</span>
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

export default Reminder;


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

  // later today 구하기
  // const currentTimeString = new Date().toTimeString()
  // let laterToday;
  // if (currentTimeString.slice(3,5) >= "30") { 
  //   const fourHoursLater = new Date(Date.now() + 4 * 60 * 60 * 1000).toTimeString();
  //   laterToday = fourHoursLater.slice(0,2) + ":00"
  // } else { 
  //   const threeHoursLater = new Date(Date.now() + 3 * 60 * 60 * 1000).toTimeString();
  //   laterToday = threeHoursLater.slice(0,2) + ":00"
  // }