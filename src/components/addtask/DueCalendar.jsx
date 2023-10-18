import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DueCalendar = ({onCalendarSaveClick}) => {
  const [dueSelectedDate, setDueSelectedDate] = useState(new Date());

  return (
    <div className="animate-slideFadeDown5">
    <ReactDatePicker
      selected={dueSelectedDate}
      onChange={(date) => setDueSelectedDate(date)}
      todayButton="Reset"
      inline
    >
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => {
            onCalendarSaveClick(dueSelectedDate)
          }}
        >
          Save
        </div>
    </ReactDatePicker>
    </div>
  );
};

export default DueCalendar;
