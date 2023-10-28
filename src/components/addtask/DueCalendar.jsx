import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const DueCalendar = ({ onCalendarSaveClick, dueDateValue }) => {
  const initialValue = dueDateValue ? new Date(dueDateValue) : new Date();
  const [dueSelectedDate, setDueSelectedDate] = useState(initialValue);

  const options = { year: "numeric", month: "long" };

  return (
    <div
      className="animate-slideFadeDown5"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 6.4px 14.4px 0px, rgba(0, 0, 0, 0.11) 0px 1.2px 3.6px 0px",
      }}
    >
      <ReactDatePicker
        selected={dueSelectedDate}
        onChange={(date) => setDueSelectedDate(date)}
        inline
        renderCustomHeader={({ decreaseMonth, increaseMonth, date }) => (
          <div
            className="flex items-center justify-between py-1 bg-white"
            style={{ color: "#292827" }}
          >
            <p className="text-sm font-semibold px-4 ml-2">
              {date.toLocaleDateString(undefined, options)}
            </p>
            <div className="flex px-2">
              <button
                className="flex items-center justify-center w-7 h-7 hover:bg-ms-white-hover"
                onClick={decreaseMonth}
              >
                <BsArrowUp size="14px" />
              </button>
              <button
                className="flex items-center justify-center w-7 h-7 hover:bg-ms-white-hover"
                onClick={increaseMonth}
              >
                <BsArrowDown size="14px" />
              </button>
            </div>
          </div>
        )}
      >
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <button
            className="w-44 h-8 bg-ms-blue text-white rounded-md mb-2 hover:bg-ms-blue-hover animate-fillAnimation"
            style={{transition: "background-color 0.1s"}}
            onClick={() => {
              onCalendarSaveClick(dueSelectedDate);
            }}
          >
            Save
          </button>
        </div>
      </ReactDatePicker>
    </div>
  );
};

export default DueCalendar;
