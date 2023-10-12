import { PiTag } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setGroupBy } from "../../store/groupSlice";



const GroupItems = ({ onItemClick, currentLocation }) => {
  if (currentLocation === "today") currentLocation = "myday";

  const dispatch = useDispatch()

  const categoryHandler = () => {
    onItemClick()
    dispatch(setGroupBy({option:"category", location:currentLocation}))
  }

  return (
    <>
    
      <div
        className="bg-white py-1.5 rounded-sm min-w-[200px] max-w-[290px]"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
          color: "#323130",
        }}
      >
        <div
          className="font-semibold text-sm px-2 pt-2 pb-3 text-center mb-1.5"
          style={{ borderBottom: "1px solid #edebe9" }}
        >
          Group By
        </div>
        <ul>
          <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
            <button
              onClick={categoryHandler}
              className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
            >
              <div className="flex items-center max-w-full">
              <PiTag size="16px" style={{ transform: "rotate(90deg)", marginLeft: "4px", marginRight: "14px" }} />
                <span className="px-1 py-0 grow">Categories</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GroupItems;
