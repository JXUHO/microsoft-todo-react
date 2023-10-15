import { IoCalendarOutline } from "react-icons/io5";

const SortDueDateItem = ({ dueDateHandler }) => {
  return (
    <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
      <button
        onClick={dueDateHandler}
        className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
      >
        <div className="flex items-center max-w-full">
          <IoCalendarOutline
            size="16px"
            style={{ marginLeft: "4px", marginRight: "12px" }}
          />
          <span className="px-1 py-0 grow">Due date</span>
        </div>
      </button>
    </li>
  );
};

export default SortDueDateItem;
