import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const DueCalendar = ({onCalendarSaveClick}) => {
  const [dueSelectedDate, setDueSelectedDate] = useState(new Date());

  return (
    <ReactDatePicker
      id="dueCalendar"
      selected={dueSelectedDate}
      onChange={(date) => setDueSelectedDate(date)}
      todayButton="Reset"
      inline
    >
      <div>
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
      </div>
    </ReactDatePicker>
  );
};

export default DueCalendar;
