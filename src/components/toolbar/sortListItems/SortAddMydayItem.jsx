import { BsSun } from "react-icons/bs";



const SortAddMydayItem = ({ addMydayHandler }) => {
  return (
    <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
      <button
        onClick={addMydayHandler}
        className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
      >
        <div className="flex items-center max-w-full">
          <BsSun
            size="16px"
            style={{ marginLeft: "4px", marginRight: "12px" }}
          />
          <span className="px-1 py-0 grow">Added to My Day</span>
        </div>
      </button>
    </li>
  );
};

export default SortAddMydayItem;
