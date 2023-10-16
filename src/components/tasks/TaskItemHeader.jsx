import { BsChevronRight } from "react-icons/bs";

const TaskItemHeader = ({ title, isOpen, openHandler, count }) => {
  return (
    <div
      className="flex items-center min-h-52 cursor-pointer"
      style={isOpen ? null : { boxShadow: "0 17px 0 -16px #e1dfdd" }}
      onClick={openHandler}
    >
      <div className="flex items-center justify-center w-8 h-8 cursor-pointer">
        <div>
          <BsChevronRight
            className="mt-1 ml-1"
            style={{
              color: "#797775",
              transform: isOpen ? "rotate(90deg)" : "rotate(0)",
              transition: "all 0.1s linear",
            }}
          />
        </div>
      </div>
      <div className="flex p-2">
        <h3 className="font-medium">{title}</h3>
        <h3 className="ml-2" style={{ color: "#797775" }}>
          {count}
        </h3>
      </div>
    </div>
  );
};

export default TaskItemHeader;
