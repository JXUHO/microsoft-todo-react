function getDate(offset = 0) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);

  // return currentDate.toString();
  return currentDate;
}

export default getDate;
