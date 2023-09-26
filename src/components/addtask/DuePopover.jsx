import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import DueItems from "./DueItems";
import { getCustomFormatDateString } from "../utils/getDates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './custom-datepicker.css';
import Popper from "../ui/Popper";

const DuePopover = forwardRef(({ setDueDateValue, dueDateValue }, ref) => {
  const [dueButtonText, setDueButtonText] = useState("Due");
  const [showDueRemoveButton, setShowDueRemoveButton] = useState(false);
  const [dueSelectedDate, setDueSelectedDate] = useState(new Date());

  const duePopoverRef = useRef(null);
  const dueTooltipRef = useRef(null);
  const dueCalendarRef = useRef(null);

  const dueDateCalendarHandler = () => {
    setDueButtonText(getCustomFormatDateString(dueSelectedDate));
    setDueDateValue(dueSelectedDate, "dueDate");
  };

  const dueDateHandler = (dueDate) => {
    setDueButtonText(getCustomFormatDateString(dueDate));
    setDueSelectedDate(dueDate);
    setDueDateValue(dueDate, "dueDate");
  };

  useImperativeHandle(ref, () => ({
    resetDue: resetDueHandler,
    setDue: dueDateHandler
  }));

  const resetDueHandler = () => {
    setDueDateValue("", "dueDate");
    setDueSelectedDate(new Date());
    setDueButtonText("Due");
    setShowDueRemoveButton(false);
  };

  useEffect(() => {
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
  };

  return (
    <div>
      <button id="due"><span id="dueSpan"/>{dueButtonText}</button>
      <Popper
        initOpen={false}
        ref={duePopoverRef}
        placement="bottom"
        target="due"
        toggle="legacy"
      >
        <DueItems
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
        customInput={<span />}
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
});

export default DuePopover;
