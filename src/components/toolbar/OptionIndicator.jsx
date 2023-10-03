import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeOrder, initializeState } from "../../store/sortSlice";
import { BsXLg, BsChevronUp, BsChevronDown } from "react-icons/bs";

const OptionIndicator = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sortOption = useSelector(
    (state) => state.sort[location.pathname.slice(1)].sortBy
  );
  const sortOrder = useSelector(
    (state) => state.sort[location.pathname.slice(1)].order
  );

  const initializeSortHandler = () => {
    dispatch(initializeState(location.pathname));
  };
  const changeOrderHandler = () => {
    dispatch(changeOrder(location.pathname));
  };

  return (
    <div className="flex items-center justify-end mr-6">
      <div className="h-10">
        <div className="flex items-center justify-end py-2.5 pl-0.5 pr-7">
          <div className="flex items-center">
            <button onClick={changeOrderHandler}>
              {sortOrder === "descending" ? <BsChevronDown/> : <BsChevronUp />}
            </button>
            {sortOption}
          </div>
          <div className="flex items-center">
            <button onClick={initializeSortHandler}>
              <BsXLg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionIndicator;
