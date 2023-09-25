import { useEffect, useState } from "react";

const RepeatCustom = ({setRepeatRule, closeCustom}) => {
  const [repeatCustomInterval, setRepeatCustomInterval] = useState(1)
  const [repeatCustomOption, setRepeatCustomOption] = useState("week")
  const [isWeek, setIsWeek] = useState(true)
  const [repeatCustomWeekdays, setRepeatCustomWeekdays] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false
  })
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)

  const repeatCustomOptionHandler = (event) => {
    setRepeatCustomOption(event.target.value)
  }
  const repeatCustomIntervalHandler = (event) => {
    setRepeatCustomInterval(event.target.value)
  }


  const repeatCustomWeekdaysHandler = (input) => {
    setRepeatCustomWeekdays(prevState => ({...prevState, [input]: !prevState[input]}))
  }

  useEffect(() => {
    for (const weekday in repeatCustomWeekdays) {
      if (repeatCustomWeekdays[weekday] === true) {
        setIsSaveButtonDisabled(false)
        break;
      }
    }
  }, [repeatCustomWeekdays])


  const repeatCustomSaveHandler = () => {
    let selectedWeekdays = []
    for (const weekday in repeatCustomWeekdays) {
      if (repeatCustomWeekdays[weekday] === true) {
        selectedWeekdays.push(weekday)
      }
    }

    let repeatRule;
    if (repeatCustomOption === "week") {
      repeatRule = repeatCustomInterval.toString() + "-week-" + selectedWeekdays.join('-')  // fix needed
    } else {
      repeatRule = repeatCustomInterval.toString() + "-" + repeatCustomOption
    }

    setRepeatRule(repeatRule, "repeatRule")
    closeCustom()
  }
  
  useEffect(() => {
    if (repeatCustomOption !== "week") {
      setIsWeek(false)
    } else {
      setIsWeek(true)
    }
    
  }, [repeatCustomOption])


  return (
    <div>
      <div>
        <div>
          <input
            type="number"
            max={999}
            min={1}
            value={repeatCustomInterval}
            onChange={repeatCustomIntervalHandler}
          />
        </div>
        <div>
          <select
            value={repeatCustomOption}
            onChange={repeatCustomOptionHandler}
          >
            <option value="day">days</option>
            <option value="week">weeks</option>
            <option value="month">months</option>
            <option value="year">years</option>
          </select>
        </div>
      </div>

      {isWeek && (
        <div>
          <button onClick={() => repeatCustomWeekdaysHandler("sun")} style={{color: repeatCustomWeekdays.sun && "red"}}>Su</button>
          <button onClick={() => repeatCustomWeekdaysHandler("mon")} style={{color: repeatCustomWeekdays.mon && "red"}}>Mo</button>
          <button onClick={() => repeatCustomWeekdaysHandler("tue")} style={{color: repeatCustomWeekdays.tue && "red"}}>Tu</button>
          <button onClick={() => repeatCustomWeekdaysHandler("wed")} style={{color: repeatCustomWeekdays.wed && "red"}}>We</button>
          <button onClick={() => repeatCustomWeekdaysHandler("thu")} style={{color: repeatCustomWeekdays.thu && "red"}}>Th</button>
          <button onClick={() => repeatCustomWeekdaysHandler("fri")} style={{color: repeatCustomWeekdays.fri && "red"}}>Fr</button>
          <button onClick={() => repeatCustomWeekdaysHandler("sat")} style={{color: repeatCustomWeekdays.sat && "red"}}>Sa</button>
        </div>
      )}

      <button onClick={repeatCustomSaveHandler}  disabled={repeatCustomOption === "week" && isSaveButtonDisabled} >
        <span>Save</span>
      </button>
    </div>
  );
};

export default RepeatCustom;
