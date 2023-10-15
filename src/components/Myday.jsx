import AddTask from "./addtask/AddTask";
import MydayList from "./tasks/MydayList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSun } from "react-icons/bs";
import { PiDotsThreeBold, PiLightbulbThin } from "react-icons/pi";
import SortPopover from "./toolbar/SortPopover";
import GroupPopover from "./toolbar/GroupPopover";
import SortIndicator from "./toolbar/SortIndicator";
import GroupIndicator from "./toolbar/GroupIndicator";

const Myday = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isSortOptionSelected = useSelector((state) => state.sort.myday.sortBy);
  const isGroupOptionSelected = useSelector((state) => state.group.myday.groupBy);
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(openSidebar());
  };

  const todayString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="flex flex-shrink-0 relative items-center justify-center h-12 mx-6 mt-4 mb-10 ">
        <div className="flex items-center flex-1 min-w-100 mr-5 pt-4 ml-1">
          <div className="flex flex-col pt-1">
            <div className="flex items-center">
              <div>
                {!isSidebarOpen ? (
                  <button onClick={openSidebarHandler} className="mr-2">
                    <RxHamburgerMenu size="20px" />
                  </button>
                ) : (
                  <div className="px-2 py-1.5">
                    <BsSun size="20px" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium">My Day</h2>
              </div>
              <div className="px-3">
                <PiDotsThreeBold />
              </div>
            </div>
            <div
              className={`text-xs font-extralight text-gray-500 mt-1 ${
                !isSidebarOpen ? "mx-14" : "mx-1"
              }`}
            >
              {todayString}
            </div>
          </div>
        </div>
        <div className="flex">
          <SortPopover currentLocation="myday" />
          <GroupPopover currentLocation="myday"/>
          <div className="shrink-0 cursor-pointer px-3 ml-0.5">
            <div className="flex items-center">
              <PiLightbulbThin size="20px" />
              <span className="ml-1 text-sm">Suggestions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-end">
          {isSortOptionSelected && <SortIndicator currentLocation="myday" />}
          {isGroupOptionSelected && <GroupIndicator currentLocation="myday" />}
        </div>
        <AddTask currentLocation={"myday"} />
        <MydayList />
      </div>
    </>
  );
};

export default Myday;

/**
 * TODO
 * MyDayList 컴포넌트 만들기
 * CompletedMydayList를 분리하지 않음
 *
 *
 */
