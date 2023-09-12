import getDate from "../date/getDate";

const DueDate = (props) => {

  const dayToday = getDate().toString().slice(0,3);
  const dayTomorrow = getDate(1).toString().slice(0,3);
  const dayNextweek = getDate(7).toString().slice(0,3);


  const addDateHandler = (offset) => {  // date를 addtask로 넘김  
    // console.log(getDate(offset))
    props.onAddDueDate(getDate(offset))
  }


  const calendarClickHandler = () => {  // canlender render하고, duedate close
    console.log("open calendar")
  }


  return (
    <div>
      <div>Due</div>
      <ul>
        <li>
          <button onClick={() => addDateHandler(0)}>
            <span>Today </span>
            <span>{dayToday}</span>
          </button>
        </li>
        <li>
        <button onClick={() => addDateHandler(1)}>
            <span>Tomorrow </span>
            <span>{dayTomorrow}</span>
          </button>
        </li>
        <li>
        <button onClick={() => addDateHandler(7)}>
            <span>Next week </span>
            <span>{dayNextweek}</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={calendarClickHandler}>Pick a date</button>
        </li>
      </ul>
    </div>
  );
};

export default DueDate;


/**
 * TODO
 * (complete)todayDate를 연월일로 잘라서 가공하기
 * addDateHandler를 tomorrow, next week에도 붙이기
 * 
 * 
 * 
 */