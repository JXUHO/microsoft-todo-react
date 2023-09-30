import { useEffect, useState } from "react";

const RepeatCustom = ({ setRepeatRule, closeCustom }) => {
  const [repeatCustomInterval, setRepeatCustomInterval] = useState(1);
  const [repeatCustomOption, setRepeatCustomOption] = useState("week");
  const [isWeek, setIsWeek] = useState(true);
  const [repeatCustomWeekdays, setRepeatCustomWeekdays] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  });
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const repeatCustomOptionHandler = (event) => {
    setRepeatCustomOption(event.target.value);
  };
  const repeatCustomIntervalHandler = (event) => {
    setRepeatCustomInterval(event.target.value);
  };

  const repeatCustomWeekdaysHandler = (input) => {
    setRepeatCustomWeekdays((prevState) => ({
      ...prevState,
      [input]: !prevState[input],
    }));
  };

  useEffect(() => {
    const saveButtonDisabledHandler = () => {
      for (const weekday in repeatCustomWeekdays) {
        if (repeatCustomWeekdays[weekday] === true) {
          setIsSaveButtonDisabled(false);
          return;
        }
      }
      setIsSaveButtonDisabled(true);
    };
    saveButtonDisabledHandler();
  }, [repeatCustomWeekdays]);

  const repeatCustomSaveHandler = () => {
    let repeatRule;
    if (repeatCustomOption === "week") {
      let selectedWeekdays = [];
      for (const weekday in repeatCustomWeekdays) {
        if (repeatCustomWeekdays[weekday] === true) {
          selectedWeekdays.push(weekday);
        }
      }
      repeatRule =
        repeatCustomInterval.toString() + "-week-" + selectedWeekdays.join("-");
    } else {
      repeatRule = repeatCustomInterval.toString() + "-" + repeatCustomOption;
    }

    setRepeatRule(repeatRule, "repeatRule");
    closeCustom();
  };

  useEffect(() => {
    if (repeatCustomOption !== "week") {
      setIsWeek(false);
    } else {
      setIsWeek(true);
    }
  }, [repeatCustomOption]);

  return (
    <div
      className="flex flex-col items-center bg-white p-1.5"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 6.4px 14.4px 0px, rgba(0, 0, 0, 0.11) 0px 1.2px 3.6px 0px",
      }}
    >
      <div className="flex justify-center w-full">
        <div className="flex flex-1 items-center m-1.5">
          <input
            type="number"
            max={999}
            min={1}
            value={repeatCustomInterval}
            onChange={repeatCustomIntervalHandler}
            style={{
              padding: "3px",
              boxSizing: "border-box",
              background: "white",
              border: "solid 1px #edebe9",
            }}
          />
        </div>
        <div className="flex m-1.5 items-center" style={{ flex: "2" }}>
          <select
            value={repeatCustomOption}
            onChange={repeatCustomOptionHandler}
            className="w-full"
            style={{
              padding: "3px",
              boxSizing: "border-box",
              background: "white",
              border: "solid 1px #edebe9",
            }}
          >
            <option value="day">days</option>
            <option value="week">weeks</option>
            <option value="month">months</option>
            <option value="year">years</option>
          </select>
        </div>
      </div>

      {isWeek && (
        <div className="flex justify-center rounded w-full m-1.5 text-xs">
          <button
            onClick={() => repeatCustomWeekdaysHandler("sun")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.sun
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            Su
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("mon")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.mon
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            Mo
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("tue")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.tue
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            Tu
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("wed")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.wed
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            We
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("thu")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.thu
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            Th
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("fri")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.fri
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                  }
            }
          >
            Fr
          </button>
          <button
            onClick={() => repeatCustomWeekdaysHandler("sat")}
            className="shrink-0 h-9 w-9 text-center"
            style={
              repeatCustomWeekdays.sat
                ? {
                    color: "white",
                    borderColor: "#2564cf",
                    background: "#2564cf",
                  }
                : {
                    borderBottom: "1px solid #edebe9",
                    borderTop: "1px solid #edebe9",
                    borderLeft: "1px solid #edebe9",
                    borderRight: "1px solid #edebe9",
                  }
            }
          >
            Sa
          </button>
        </div>
      )}
      <button
        onClick={repeatCustomSaveHandler}
        disabled={repeatCustomOption === "week" && isSaveButtonDisabled}
        className="disabled:opacity-50 disabled:cursor-default text-white font-bold bg-ms-blue px-3 border-none w-auto h-auto rounded cursor-pointer hover:bg-ms-blue-hover"
        style={{ paddingTop: "0.4rem", paddingBottom: "0.4rem" }}
      >
        <span>Save</span>
      </button>
    </div>
  );
};

export default RepeatCustom;

/**
 * day, month, year 2 이상 custom 됐을때 오류 발생.
 */
