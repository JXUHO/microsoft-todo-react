export default function sortTasks(sortBy, sortOrder, todos) {
  let sortedArr = [...todos];

  switch (sortBy) {


    case "importance":
      let importanceSelectedTasks = [];
      sortedArr.forEach((task) => {
        if (task.importance) {
          importanceSelectedTasks.push(task);
        }
      });
      sortedArr = sortedArr.filter((task) => !task.importance);
      if (sortOrder === "descending") {
        sortedArr = [...sortedArr, ...importanceSelectedTasks];
      } else {
        sortedArr = [...importanceSelectedTasks, ...sortedArr];
      }
      break;



    case "dueDate":
      let dueSelectedTasks = [];
      sortedArr.forEach((task) => {
        if (task.dueDate) {
          dueSelectedTasks.push(task);
        }
      });
      sortedArr = sortedArr.filter((task) => !task.dueDate);
      dueSelectedTasks = dueSelectedTasks.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
      if (sortOrder === "descending") {
        dueSelectedTasks = dueSelectedTasks.reverse();
      }
      sortedArr = [...sortedArr, ...dueSelectedTasks];
      break;



    case "alphabetically":
      sortedArr = sortedArr.sort((a, b) => a.task.localeCompare(b.task));
      if (sortOrder === "descending") {sortedArr = sortedArr.reverse()}
      break;



    case "creationDate":
      sortedArr = sortedArr.sort((a, b) => new Date(a.created) - new Date(b.created));
      if (sortOrder === "descending") {sortedArr = sortedArr.reverse()}
      break;

    default:
      break;
  }

  return sortedArr;

}


