// return date object with offset
export default function getLastTimeOfDay(offset = 0) {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(23, 59, 59, 0);
  return date;
}

// return "Mon, September 18" format string
export function getCustomFormatDateString(input, option) {
  const today = new Date();
  const tomorrow = new Date();
  const yesterday = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const tomorrowDate = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  );
  const yesterdayDate = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const inputDate = new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate()
  );

  if (inputDate.toISOString() === todayDate.toISOString()) {
    return "Today";
  } else if (inputDate.toISOString() === tomorrowDate.toISOString()) {
    return "Tomorrow";
  } else if (inputDate.toISOString() === yesterdayDate.toISOString()) {
    return "Yesterday";
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[input.getDay()];
  const month = months[input.getMonth()];
  const dayOfMonth = input.getDate();

  const year = input.getFullYear();
  const currentYear = today.getFullYear();
  const yearString = year !== currentYear ? `, ${year}` : '';

  if (option === "dueDate" && (todayDate - inputDate) / (1000 * 60 * 60 * 24) > 2) {
    return `Overdue, ${dayOfWeek}, ${month} ${dayOfMonth}${yearString}`;
  } else if (option === "dueDate") {
    return `Due ${dayOfWeek}, ${month} ${dayOfMonth}${yearString}`
  }
  
  return `${dayOfWeek}, ${month} ${dayOfMonth}${yearString}`;
}

export function getTomorrow9AM() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  return tomorrow;
}

export function getNextMonday9AM() {
  // if today is monday, return today
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
  const currentTime = new Date();
  const currentTimeString = currentTime.toTimeString();
  const hoursToAdd = currentTimeString.slice(3, 5) >= "30" ? 4 : 3;
  const laterToday = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000); // date 객체
  laterToday.setMinutes(0);
  laterToday.setSeconds(0);
  laterToday.setMilliseconds(0);
  return laterToday;
}

export function formatTimeToAMPM(date, minute = true) {
  let timeString;
  if (minute) {
    // 9:00 AM, 11:00 PM
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    timeString = date.toLocaleTimeString(undefined, options);
  } else {
    // 9 AM, 11 PM
    const options = { hour: "numeric", hour12: true };
    timeString = date.toLocaleTimeString(undefined, options);
  }

  return timeString;
}

export function getDayOfWeek(date) {
  // dateObj => "thu"
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayIndex = date.getDay();

  if (dayIndex >= 0 && dayIndex < daysOfWeek.length) {
    return daysOfWeek[dayIndex];
  } else {
    throw new Error("Invalid date provided");
  }
}

export function getFullDayNames(abbreviatedDayNames) {  
  //["mon", "tue"] => ["Monday", "Tuesday"]
  const dayNameMap = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };

  return abbreviatedDayNames.map((abbreviatedDay) =>
    dayNameMap[abbreviatedDay.toLowerCase()] || abbreviatedDay
  );
}

export function isValidWeekdaysArray(weekdaysArray) {
  // ["mon", "tue", "wed"] => false 
  const validWeekdays = ["mon", "tue", "wed", "thu", "fri"];

  if (weekdaysArray.length !== 5) {
    return false; 
  }

  return weekdaysArray.every((weekday) =>
    validWeekdays.includes(weekday)
  );
}

export function getNextClosestDayOfWeekFromDate(baseDate, targetDaysOfWeek) {
  // (dateObj, ["mon", "tue"]) => baseDate와 가장 가까운 target요일
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const baseDayIndex = baseDate.getDay();
  targetDaysOfWeek.sort((a, b) => {
    return (
      daysOfWeek.indexOf(a.toLowerCase()) - daysOfWeek.indexOf(b.toLowerCase())
    );
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

export function getNextRepeatDate(date, repeatRule) {
  // (dateObj, "1-day"), daily, custom-days
  const nextRepeatDate = date;
  const offset = parseInt(repeatRule.split("-")[0]);
  nextRepeatDate.setDate(nextRepeatDate.getDate() + offset);
  return nextRepeatDate;
}

export function getNextRepeatMonth(date, repeatRule) {
  // (dateObj, "1-month-31") monthly, custom-months
  const nextRepeatMonth = new Date(date);
  const offset = parseInt(repeatRule.split("-")[0]);
  let newMonthRepeatRule = repeatRule;

  // 옵션 없을때
  if (repeatRule.split("-").length === 2) {
    let expectedMonth = (date.getMonth() + parseInt(offset)) % 12;
    nextRepeatMonth.setMonth(nextRepeatMonth.getMonth() + offset);
    if (nextRepeatMonth.getMonth() !== expectedMonth) {
      nextRepeatMonth.setDate(0);
    }
    newMonthRepeatRule = repeatRule + "-" + date.getDate().toString();
  } else {
    const expectedMonth = (date.getMonth() + offset) % 12;
    nextRepeatMonth.setMonth(nextRepeatMonth.getMonth() + offset);
    if (nextRepeatMonth.getMonth() !== expectedMonth) {
      nextRepeatMonth.setDate(0);
    }

    let temp = new Date(nextRepeatMonth);
    nextRepeatMonth.setDate(parseInt(repeatRule.split("-")[2]));

    if (temp.getMonth() !== nextRepeatMonth.getMonth()) {
      nextRepeatMonth.setDate(0);
    }
  }

  return { nextRepeatMonth, newMonthRepeatRule };
}

export function getNextRepeatYear(date, repeatRule) {
  const nextRepeatYear = new Date(date);
  let newYearRepeatRule = repeatRule;
  const offset = parseInt(repeatRule.split("-")[0]);

  if (date.getMonth() === 1 && date.getDate() === 29) {
    newYearRepeatRule = newYearRepeatRule + "-leap";
  }

  if (newYearRepeatRule.split("-").length === 2) {
    nextRepeatYear.setFullYear(nextRepeatYear.getFullYear() + offset);
  } else {
    const nextYear = date.getFullYear() + offset;
    if ((nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0) {
      nextRepeatYear.setFullYear(nextYear)
      nextRepeatYear.setMonth(1)
      nextRepeatYear.setDate(29)
    } else {
      nextRepeatYear.setFullYear(nextYear)
      nextRepeatYear.setMonth(1)
      nextRepeatYear.setDate(28)
    }
  }

  return { nextRepeatYear, newYearRepeatRule };
}



// date로 들어온, dueDate로 설정된 날짜가, 오늘과 일치하지 않으면, 가장 가까운 repeat rule에 설정된 날짜로 변경함.
// week 옵션에는 반드시 요일 옵션이 존재해야 한다 -> RepeatPopover.jsx에서 week 옵션 뒤에 current 요일옵션 추가해야함
// 아래 코드에서 옵션 없을 때를 제거하고, useRepeatTasks hook에서 repeatRule이 존재하고&&complete가안됐고&&repeated가false이면 해당 요일을 변경해야 한다

export function getNextRepeatWeekWithOption(date, repeatRule) {
  // (dateObj, "1-week-sun-wed-fri") => 해당하는 task가 완료됐을때, rule을 반영한 다음 repeat 날짜를 return한다
  const dayOfWeekMap = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const currentDueDate = date;
  const ruleDaysArr = repeatRule.split("-").slice(2);
  const currentDayOfWeek = currentDueDate.getDay();
  let nextRepeatDate = new Date(currentDueDate);
  let shouldAddInterval = true;
  let closestDay = 7;
  let earlistOfWeek = 7;

  // 이번주에 남은 요일이 있을때. ((ex) 2-week-sat, today: tue)
  for (let i = 0; i < ruleDaysArr.length; i++) {
    if (
      dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek > 0 &&
      dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek < closestDay
    ) {
      closestDay = dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek;
      nextRepeatDate = new Date(currentDueDate);
      nextRepeatDate.setDate(
        currentDueDate.getDate() +
          (dayOfWeekMap[ruleDaysArr[i]] - currentDayOfWeek)
      );
      shouldAddInterval = false;
    }
    if (dayOfWeekMap[ruleDaysArr[i]] < earlistOfWeek) {
      earlistOfWeek = dayOfWeekMap[ruleDaysArr[i]];
    }
  }

  // 이번주에 남은 요일이 없을때(오늘 포함) ((ex) 3-week-tue, today: tue)
  if (shouldAddInterval) {
    const intervalOfWeek = parseInt(repeatRule.split("-")[0]);
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


