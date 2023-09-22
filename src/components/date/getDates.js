// return date object with offset
export default function getLastTimeOfDay(offset = 0) {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(23, 59, 59, 0)
  return date;
}


// return "Mon, September 18" format string
export function getCustomFormatDateString(input, overdue=true) {
  const today = new Date()
  const tomorrow = new Date()
  const yesterday = new Date()
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const yesterdayDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  const inputDate = new Date(input.getFullYear(), input.getMonth(), input.getDate());

  if (inputDate.toISOString() === todayDate.toISOString()) {
    return "Today"
  } else if (inputDate.toISOString() === tomorrowDate.toISOString()) {
    return "Tomorrow"
  } else if (inputDate.toISOString() === yesterdayDate.toISOString()) {
    return "Yesterday"
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = daysOfWeek[input.getDay()];
  const month = months[input.getMonth()];
  const dayOfMonth = input.getDate();

  if (overdue && ((todayDate - inputDate) / (1000 * 60 * 60 * 24) > 2)) {
    return `Overdue, ${dayOfWeek}, ${month} ${dayOfMonth}`
  }

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}



export function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  return tomorrow
}

export function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const nextMonday = new Date();
  if (dayOfWeek === 1) {
    nextMonday.setDate(today.getDate() + 7);
  } else {
    const daysUntilNextMonday = (8 - dayOfWeek) % 7; 
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  }
  nextMonday.setHours(9, 0, 0, 0); 
  return nextMonday;
}


export function getThreeHoursLater() {
  const currentTime = new Date()
  const currentTimeString = currentTime.toTimeString();
  const hoursToAdd = currentTimeString.slice(3, 5) >= "30" ? 4 : 3;
  const laterToday = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000)  // date 객체
  laterToday.setMinutes(0)
  laterToday.setSeconds(0)
  laterToday.setMilliseconds(0)
  return laterToday
}


export function formatTimeToAMPM(date, minute=true) {
  let timeString;
  if (minute) {  // 9:00 AM, 11:00 PM
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    timeString = date.toLocaleTimeString(undefined, options);
  } else {  // 9 AM, 11 PM
    const options = { hour: 'numeric', hour12: true };
    timeString = date.toLocaleTimeString(undefined, options);
  }

  return timeString;
}

export function getDayOfWeek(date) {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayIndex = date.getDay();
  
  if (dayIndex >= 0 && dayIndex < daysOfWeek.length) {
    return daysOfWeek[dayIndex];
  } else {
    throw new Error("Invalid date provided");
  }
}


export function getNextClosestDayOfWeekFromDate(baseDate, targetDaysOfWeek) {  // dateObj, ["mon", "tue"]
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const baseDayIndex = baseDate.getDay();
  targetDaysOfWeek.sort((a, b) => {
    return daysOfWeek.indexOf(a.toLowerCase()) - daysOfWeek.indexOf(b.toLowerCase());
  });
  let closestDate = null;
  for (const targetDayOfWeek of targetDaysOfWeek) {
    const targetDayIndex = daysOfWeek.indexOf(targetDayOfWeek.toLowerCase());
    if (targetDayIndex === -1) {
      throw new Error("Invalid day of the week");
    }
    let daysToAdd = (targetDayIndex + 7 - baseDayIndex) % 7;
    const nextDate = new Date(baseDate);
    nextDate.setDate(baseDate.getDate() + daysToAdd);
    if (!closestDate || nextDate < closestDate) {
      closestDate = nextDate;
    }
  }
  return closestDate;
}




function getNextRepeatDay(date, offset = 1) {  // daily, custom-days
  const nextDay = date;
  nextDay.setDate(nextDay.getDate() + offset);
  return nextDay
}


// export function getNextRepeatDateOfWeek(baseDate, dayOfWeek, intervalOfWeek) {  // interval만큼 뒤의 daysOfWeek의 date obj를 구함
//   const dayOfWeekMap = {
//     sun: 0,
//     mon: 1,
//     tue: 2,
//     wed: 3,
//     thu: 4,
//     fri: 5,
//     sat: 6,
//   };

//   const targetDayOfWeek = dayOfWeekMap[dayOfWeek.toLowerCase()];
//   const currentDayOfWeek = baseDate.getDay();
//   let daysUntilTarget = (targetDayOfWeek + 7 - currentDayOfWeek) % 7;

//   if (daysUntilTarget < 0) {
//     daysUntilTarget += 7;
//   }

//   const daysToAdd = daysUntilTarget + (intervalOfWeek - 1) * 7;

//   const nextRepeatDate = new Date(baseDate);
//   nextRepeatDate.setDate(baseDate.getDate() + daysToAdd);

//   if (currentDayOfWeek === targetDayOfWeek) {
//     nextRepeatDate.setDate(nextRepeatDate.getDate() + 7);
//   }

//   return nextRepeatDate;
// }


export function getNextRepeatWeek (repeatRule, currentDueDate) {
  const dayOfWeekMap = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const ruleDaysArr = repeatRule.split("-").slice(2)
  const currentDayOfWeek = currentDueDate.getDay()
  let nextRepeatDate;
  let shouldAddInterval = true
  let closestDay = 7
  let earlistOfWeek = 7
  for (let i = 0; i < ruleDaysArr.length; i++) {
    if (dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek > 0 && dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek < closestDay) {  // 이번주에 남은 요일이 있을때.
        closestDay = dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek;
        nextRepeatDate = new Date(currentDueDate)
        nextRepeatDate.setDate(currentDueDate.getDate() + (dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek))
        shouldAddInterval = false
    }
    if (dayOfWeekMap[ruleDaysArr[i]] < earlistOfWeek) {
      earlistOfWeek = dayOfWeekMap[ruleDaysArr[i]]
    }
  }
  console.log(earlistOfWeek)
  
  if (shouldAddInterval) {  // 이번주에 남은 요일이 없을때(오늘 포함) -> 인터벌 주 이후의 해당 요일 date객체를 구해야함.
    const intervalOfWeek = parseInt(repeatRule.split("-")[0])
    let daysUntilTarget = (earlistOfWeek + 7 - currentDayOfWeek) % 7;
    if (daysUntilTarget < 0) {
      daysUntilTarget += 7;
    }
    const daysToAdd = daysUntilTarget + (intervalOfWeek - 1) * 7;
    nextRepeatDate = new Date(currentDueDate);
    nextRepeatDate.setDate(currentDueDate.getDate() + daysToAdd);
  
    if (currentDayOfWeek === earlistOfWeek) {
      nextRepeatDate.setDate(nextRepeatDate.getDate() + 7);
    }
  }
  
  return nextRepeatDate;
}






// "2023-09-22T14:59:59.000Z" -> Fri Sep 22 2023 23:59:59 GMT+0900 (Korean Standard Time)
//"1-week-mon-tue-wed-thu-fri" -> ['1', 'week', 'mon', 'tue', 'wed', 'thu', 'fri']
// export function getNextRepeat(currentDateISO, repeatRule) {
//   const currentDueDate = new Date(taskItem.dueDate);
//   const repeatRule = taskItem.repeatRule.split("-");
//   if (repeatRule.length === 2) {

//   }


// }