export default function sortTasks(sortBy, sortOrder, tasksArr) {
  let sortedArr = [...tasksArr];
  if (sortedArr.length === 0) return sortedArr
  if (!sortBy) return sortedArr;
  // default. 옵션 없는경우
  // 원본배열은 importance가 true로 변경되면, 배열의 마지막으로 push한 후, render할 때에는 reverse했음.
  // importance dueDate alphabetically creationDate

  const sortByImportance = (a, b) => b.importance - a.importance;

  // Function to sort by dueDate
  const sortByDueDate = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);

  // Function to sort alphabetically by name
  const sortAlphabetically = (a, b) => a.task.localeCompare(b.task);

  // Function to sort by creationDate
  const sortByCreationDate = (a, b) =>
    new Date(a.created) - new Date(b.created);

  // Sorting options
  const options = {
    importance: sortByImportance,
    dueDate: sortByDueDate,
    alphabetically: sortAlphabetically,
    creationDate: sortByCreationDate,
  };

  // Sort by a selected option
  sortedArr = sortedArr.sort(options[sortBy]);

  if (sortOrder === 'ascending') return sortedArr.reverse()  // 무조건 뒤집으면 안됨. 해당하는 것들 있을 때에만 trigger해야 한다.

  return sortedArr;
  // order === 'ascending'이면 reverse해서 return. descending이면 그냥 return
}


/**
 * TODO
 * importance 옵션 => importance가 설정된 항목들을 상단으로, 하단으로 붙임. importance항목끼리는 순서가 바뀌지 않음
 * dueDate 옵션 => dueDate가 설정된 항목을 상단으로 올리고, dueDate가 설정된 항목끼리만 정렬함
 * 
 * 
 */