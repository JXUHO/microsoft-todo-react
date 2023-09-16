// return date object with offset
export default function getLastTimeOfDay(offset = 0) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);
  currentDate.setHours(23, 59, 59)
  return currentDate;
}


// return "Mon, September 18" format string
export function getCustomFormatDateString(date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
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


export function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  return tomorrow
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


/**
 * 
 * 
 * 'September 15, 2023 23:24:00'
 * 
 * 
 * */