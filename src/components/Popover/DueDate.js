import getDateString from "../date/getDate";


const DueDate = (props) => {

  const addDateHandler = (offset) => {
    console.log(getDateString(offset))
    props.onAddDetail({date: getDateString(offset)})
  }

  const dayToday = getDateString().toString().slice(0,3);
  const dayTomorrow = getDateString(1).toString().slice(0,3);
  const dayNextweek = getDateString(7).toString().slice(0,3);


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
          <button>Pick a date</button>
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