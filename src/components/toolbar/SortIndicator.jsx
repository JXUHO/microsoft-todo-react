import { useDispatch, useSelector } from "react-redux";
import { changeOrder, initializeState } from "../../store/sortSlice";
import { BsXLg, BsChevronUp, BsChevronDown } from "react-icons/bs";

const SortIndicator = ({currentLocation}) => {
  const dispatch = useDispatch();
  const sortOption = useSelector(
    (state) => state.sort[currentLocation].sortBy
  );
  const sortOrder = useSelector(
    (state) => state.sort[currentLocation].order
  );

  const initializeSortHandler = () => {
    dispatch(initializeState(currentLocation));
  };
  const changeOrderHandler = () => {
    dispatch(changeOrder(currentLocation));
  };

  let sortIndicatorText = ""
  switch (sortOption) {
    case "importance":
      sortIndicatorText = "Sorted by importance"
      break;
    case "dueDate":
      sortIndicatorText = "Sorted by due date"
      break;
    case "alphabetically":
      sortIndicatorText = "Sorted alphabetically"
      break;
    case "creationDate":
      sortIndicatorText = "Sorted by creation date"
      break;
  
    default:
      break;
  }

  return (
      <div className="h-10">
        <div className="flex items-center justify-end py-2.5 pr-0.5 pl-7 font-semibold text-xs" style={{color:'#323130'}}>
          <div className="flex items-center">
            <button onClick={changeOrderHandler} className="inline-block h-6 w-6 p-1 align-middle mx-1 cursor-pointer">
              {sortOrder === "descending" ? <BsChevronDown/> : <BsChevronUp />}
            </button>

            {sortIndicatorText}

          </div>
          <div className="flex items-center cursor-pointer w-6 h-6 p-1 pt-1.5 mx-1 ">
            <button onClick={initializeSortHandler}>
              <BsXLg />
            </button>
          </div>
        </div>
      </div>
  );
};

export default SortIndicator;
