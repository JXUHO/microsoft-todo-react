function getDateString(offset = 0) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);

  return currentDate.toString();
}

export default getDateString;
