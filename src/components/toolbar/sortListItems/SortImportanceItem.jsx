import { BsStar } from "react-icons/bs";

const SortImportanceItem = ({importanceHandler}) => {
  return (
    <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
      <button
        onClick={importanceHandler}
        className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
      >
        <div className="flex items-center max-w-full">
          <BsStar
            size="16px"
            style={{ marginLeft: "4px", marginRight: "14px" }}
          />
          <span className="px-1 py-0 grow">Importance</span>
        </div>
      </button>
    </li>
  );
};

export default SortImportanceItem;
