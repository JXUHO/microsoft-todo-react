import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RemindCalendar = ({onCalendarSaveClick}) => {
  const [remindSelectedTime, setRemindSelectedTime] = useState(new Date());

  return (
    <ReactDatePicker
      selected={remindSelectedTime}
      onChange={(date) => setRemindSelectedTime(date)}
      todayButton="Reset"
      showTimeSelect
      timeIntervals={15}
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
            onCalendarSaveClick(remindSelectedTime)
          }}
        >
          Save
        </div>
      </div>
    </ReactDatePicker>
  );
};

export default RemindCalendar;
