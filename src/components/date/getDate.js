function getDateString(offset = 0) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);
  return currentDate;
}

export default getDateString;
