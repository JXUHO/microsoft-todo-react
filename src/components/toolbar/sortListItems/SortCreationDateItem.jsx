import { BsCalendarPlus } from "react-icons/bs";

const SortCreationDateItem = ({ creationDateHandler }) => {
  return (
    <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
      <button
        onClick={creationDateHandler}
        className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
      >
        <div className="flex items-center max-w-full">
          <BsCalendarPlus
            size="16px"
            style={{ marginLeft: "4px", marginRight: "12px" }}
          />
          <span className="px-1 py-0 grow">Creation Date</span>
        </div>
      </button>
    </li>
  );
};

export default SortCreationDateItem;
