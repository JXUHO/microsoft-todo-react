import { useDispatch } from "react-redux";
import { setSortBy } from "../../store/sortSlice";
import SortDueDateItem from "./sortListItems/SortDueDateItem";
import SortAlphabeticallyItem from "./sortListItems/SortAlphabeticallyItem";
import SortCreationDateItem from "./sortListItems/SortCreationDateItem";
import SortAddMydayItem from "./sortListItems/SortAddMydayItem";

const ImportantSortItems = ({onItemClick, currentLocation}) => {
  // 현재 페이지 가지고와서, 페이지에 따라 render 다르게해야 한다
  const dispatch = useDispatch()

  const dueDateHandler = () => {
    onItemClick()
    dispatch(setSortBy({option: "dueDate", location: currentLocation}))
  }

  const alphabeticallyHandler =() => {
    onItemClick()
    dispatch(setSortBy({option: "alphabetically", location: currentLocation}))
  }

  const creationDateHandler = () => {
    onItemClick()
    dispatch(setSortBy({option: "creationDate", location: currentLocation}))
  }

  const addMydayHandler = () => {
    onItemClick()
    dispatch(setSortBy({option: "myday", location: currentLocation}))
  }

  return (
    <div
      className="bg-white py-1.5 rounded-sm min-w-[200px] max-w-[290px] animate-slideFadeDown5"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
          color:'#323130'
      }}
    >
      <div
        className="font-semibold text-sm px-2 pt-2 pb-3 text-center mb-1.5"
        style={{ borderBottom: "1px solid #edebe9" }}
      >
        Sort By
      </div>
      <ul>
        <SortDueDateItem dueDateHandler={dueDateHandler} />
        <SortAddMydayItem addMydayHandler={addMydayHandler} /> 
        <SortAlphabeticallyItem alphabeticallyHandler={alphabeticallyHandler} />
        <SortCreationDateItem creationDateHandler={creationDateHandler} />
      </ul>
    </div>
  );
};

export default ImportantSortItems;
