import { useEffect, useRef, useState } from "react";
import RepeatItems from './RepeatItems'
import { formatTimeToAMPM, getCustomFormatDateString } from "../date/getDates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popper from "../ui/Popper";


const RepeatPopover = ({setrepeatValue, repeatValue}) => {
  const [repeatButtonText, setRepeatButtonText] = useState("repeat");
  const [showRepeatRemoveButton, setShowRepeatRemoveButton] = useState(false);
  const [repeatSelectedTime, setRepeatSelectedTime] = useState(new Date());

  const repeatPopoverRef = useRef(null);
  const repeatTooltipRef = useRef(null);
  const repeatCalendarRef = useRef(null);

  const repeatCalendarHandler = () => {
    setRepeatButtonText(
      formatTimeToAMPM(repeatSelectedTime) +
        ", " +
        getCustomFormatDateString(repeatSelectedTime, false)
    );
    setrepeatValue(repeatSelectedTime, "repeat")
  };

  const repeatHandler = (repeat) => {
    setRepeatButtonText(repeat.text);
    setRepeatSelectedTime(repeat.time);
    setrepeatValue(repeat.time, "repeat")
  };

  const resetRepeatHandler = () => {
    setrepeatValue("", "repeat")
    setRepeatSelectedTime(new Date());
    setRepeatButtonText("repeat");
    setShowRepeatRemoveButton(false);
  };

  useEffect(() => {
    if (repeatValue) {
      setShowRepeatRemoveButton(true);
    }
  }, [repeatValue]);

  const showCalendarHandler = (calendarId) => {
    const calendar = document.getElementById(calendarId);
    if (calendar) {
      calendar.click();
    }
  };

  const closePopoverHandler = () => {
    repeatPopoverRef.current.setVisibility(false);
  };

  return (
    <div>
      <button id="repeat">{repeatButtonText}</button>
      <Popper
        initOpen={false}
        ref={repeatPopoverRef}
        placement="bottom"
        target="repeat"
        toggle="legacy"
      >
        <RepeatItems
          onAddrepeat={repeatHandler} // 완료
          onClosePopover={closePopoverHandler} // 완료
          showRemoveButton={showRepeatRemoveButton}
          resetrepeat={resetRepeatHandler}
          showCalendar={showCalendarHandler}
        />
      </Popper>
      <Popper
        initOpen={false}
        ref={repeatTooltipRef}
        placement="bottom"
        target="repeat"
        toggle="hover"
      >
        repeat me
      </Popper>
      <DatePicker
        id="repeatCalendar"
        ref={repeatCalendarRef}
        selected={repeatSelectedTime}
        onChange={(date) => setRepeatSelectedTime(date)}
        showTimeSelect
        timeIntervals={15}
        todayButton="Reset"
        shouldCloseOnSelect={false}
        customInput={<span></span>}
        showPopperArrow={false}
      >
        <div>
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              repeatCalendarRef.current.setOpen(false);
              repeatCalendarHandler();
            }}
          >
            Save
          </div>
        </div>
      </DatePicker>
    </div>
  );
};

export default RepeatPopover;
