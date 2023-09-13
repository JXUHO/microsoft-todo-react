// return date object with offset
export default function getDate(offset = 0) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);

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





