import { PiArrowsDownUpThin } from "react-icons/pi";



const SortAlphabeticallyItem = ({alphabeticallyHandler}) => {
  return (
    <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
      <button
        onClick={alphabeticallyHandler}
        className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
      >
        <div className="flex items-center max-w-full">
          <PiArrowsDownUpThin
            size="20px"
            style={{ marginLeft: "2px", marginRight: "10px" }}
          />
          <span className="px-1 py-0 grow">Alphabetically</span>
        </div>
      </button>
    </li>
  );
};

export default SortAlphabeticallyItem;
