import { useEffect, useRef, useState } from "react";
import Reminder from "./Reminder";
import { formatTimeToAMPM, getCustomFormatDateString } from "../date/getDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popper from "../ui/Popper";


const RemindPopover = ({setRemindValue, remindValue}) => {
  const [remindButtonText, setRemindButtonText] = useState("Remind");
  const [showRemindRemoveButton, setShowRemindRemoveButton] = useState(false);
  const [remindSelectedTime, setRemindSelectedTime] = useState(new Date());

  const remindPopoverRef = useRef(null);
  const remindTooltipRef = useRef(null);
  const remindCalendarRef = useRef(null);

  const remindCalendarHandler = () => {
    setRemindButtonText(
      formatTimeToAMPM(remindSelectedTime) +
        ", " +
        getCustomFormatDateString(remindSelectedTime)
    );
    setRemindValue(remindSelectedTime, "remind")
  };

  const remindHandler = (remind) => {
    setRemindButtonText(remind.text);
    setRemindSelectedTime(remind.time);
    setRemindValue(remind.time, "remind")
  };

  const resetRemindHandler = () => {
    setRemindValue("", "remind")
    setRemindSelectedTime(new Date());
    setRemindButtonText("Remind");
    setShowRemindRemoveButton(false);
  };

  useEffect(() => {
    if (remindValue) {
      setShowRemindRemoveButton(true);
    }
  }, [remindValue]);

  const showCalendarHandler = (calendarId) => {
    const calendar = document.getElementById(calendarId);
    if (calendar) {
      calendar.click();
    }
  };

  const closePopoverHandler = () => {
    remindPopoverRef.current.setVisibility(false);
  };

  return (
    <div>
      <button id="remind">{remindButtonText}</button>
      <Popper
        initOpen={false}
        ref={remindPopoverRef}
        placement="bottom"
        target="remind"
        toggle="legacy"
      >
        <Reminder
          onAddRemind={remindHandler} // 완료
          onClosePopover={closePopoverHandler} // 완료
          showRemoveButton={showRemindRemoveButton}
          resetRemind={resetRemindHandler}
          showCalendar={showCalendarHandler}
        />
      </Popper>
      <Popper
        initOpen={false}
        ref={remindTooltipRef}
        placement="bottom"
        target="remind"
        toggle="hover"
      >
        Remind me
      </Popper>
      <DatePicker
        id="remindCalendar"
        ref={remindCalendarRef}
        selected={remindSelectedTime}
        onChange={(date) => setRemindSelectedTime(date)}
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
              remindCalendarRef.current.setOpen(false);
              remindCalendarHandler();
            }}
          >
            Save
          </div>
        </div>
      </DatePicker>
    </div>
  );
};

export default RemindPopover;
