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
import "./custom-datepicker.css";
import Popper from "../ui/Popper";
import { IoCalendarOutline } from "react-icons/io5";

const DuePopover = forwardRef(({ setDueDateValue, dueDateValue }, ref) => {
  const [dueButtonText, setDueButtonText] = useState("");
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
    setDue: dueDateHandler,
  }));

  const resetDueHandler = () => {
    setDueDateValue("", "dueDate");
    setDueSelectedDate(new Date());
    setDueButtonText("");
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
      <div id='due'>
        <div>
          <IoCalendarOutline size='16px'/>
        </div>
        {dueButtonText}
      </div>
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



/** 
 * TODO
 * 
 * id='due' 내부에 있는 아이콘을 클릭하더라도 popover가 trigger되게 해야 한다 (해결)
 * 
 * 
 */