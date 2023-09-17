import { useEffect, useRef, useState } from "react";
import DueDate from "./DueDate";
import { getCustomFormatDateString } from "../date/getDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popper from "../ui/Popper";


const DuePopover = ({setDueDateValue, dueDateValue}) => {
  const [dueButtonText, setDueButtonText] = useState("Due");
  const [showDueRemoveButton, setShowDueRemoveButton] = useState(false);
  const [dueSelectedDate, setDueSelectedDate] = useState(new Date());

  const duePopoverRef = useRef(null);
  const dueTooltipRef = useRef(null);
  const dueCalendarRef = useRef(null);

  const dueDateCalendarHandler = () => {
    // overdue 조건
    setDueButtonText(getCustomFormatDateString(dueSelectedDate));
    setDueDateValue(dueSelectedDate, "dueDate")
  };

  const dueDateHandler = (dueDate) => {
    setDueButtonText(dueDate.text);
    setDueSelectedDate(dueDate.date);
    setDueDateValue(dueDate.date, "dueDate")
  };

  const resetDueHandler = () => {
    setDueDateValue("", "dueDate")
    setDueSelectedDate(new Date());
    setDueButtonText("Due");
    setShowDueRemoveButton(false);
  };

  useEffect(() => {
    // remove button 생성
    if (dueDateValue) {
      setShowDueRemoveButton(true);
    }
  }, [dueDateValue]);

  const showCalendarHandler = (calendarId) => {
    const calendar = document.getElementById(calendarId);
    if (calendar) {
      calendar.click();
    }
  };

  const closePopoverHandler = () => {
    duePopoverRef.current.setVisibility(false);
    // reminder, repeat
  };

  return (
    <div>
      <button id="due">{dueButtonText}</button>
      <Popper
        initOpen={false}
        ref={duePopoverRef}
        placement="bottom"
        target="due"
        toggle="legacy"
      >
        <DueDate
          onAddDueDate={dueDateHandler}
          onClosePopover={closePopoverHandler}
          showRemoveButton={showDueRemoveButton}
          resetDue={resetDueHandler}
          showCalendar={showCalendarHandler}
        />
      </Popper>
      <Popper
        initOpen={false}
        ref={dueTooltipRef}
        placement="bottom"
        target="due"
        toggle="hover"
      >
        Add due date
      </Popper>
      <DatePicker
        id="dueCalendar"
        ref={dueCalendarRef}
        selected={dueSelectedDate}
        onChange={(date) => setDueSelectedDate(date)}
        shouldCloseOnSelect={false}
        customInput={<span></span>}
        showPopperArrow={false}
        todayButton="Reset"
      >
        <div>
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              dueCalendarRef.current.setOpen(false);
              dueDateCalendarHandler();
            }}
          >
            Save
          </div>
        </div>
      </DatePicker>
    </div>
  );
};

export default DuePopover;

