import AddTask from "./addtask/AddTask";
import TaskList from "./tasks/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../store/uiSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSun } from "react-icons/bs";
import {
  PiDotsThreeBold,
  PiArrowsDownUpThin,
  PiFolderSimpleThin,
  PiLightbulbThin,
} from "react-icons/pi";

const Myday = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
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
      <div className="flex flex-shrink-0 relative items-center justify-center h-12 mx-6 mt-4 mb-10">
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
          <div className="self-start shrink-0 cursor-pointer px-3 ml-0.5">
            <div className="flex items-center">
              <PiArrowsDownUpThin size="20px" />
              <span className="ml-1 text-sm">Sort</span>
            </div>
          </div>
          <div className="self-start shrink-0 cursor-pointer px-3 ml-0.5">
            <div className="flex items-center">
              <PiFolderSimpleThin size="20px" />
              <span className="ml-1 text-sm">Group</span>
            </div>
          </div>
          <div className="self-start shrink-0 cursor-pointer px-3 ml-0.5">
            <div className="flex items-center">
              <PiLightbulbThin size="20px" />
              <span className="ml-1 text-sm">Suggestions</span>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col flex-1 overflow-hidden mx-6 border-solid" style={{boxShadow: '0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)'}}>
        <AddTask isMyday={true} />
        <TaskList />
      </div>
        

    </>
  );
};

export default Myday;

// <div>
//   <div> {/**task toolbar*/}
//     {!isSidebarOpen && (
//       <button onClick={openSidebarHandler}>
//         <RxHamburgerMenu size="20px" />
//       </button>
//     )}
//   <h1>Myday</h1>
//   <AddTask isMyday={true} />
//   </div>
//   <div> {/**flex container */}
//     <TaskList />
//   </div>
// </div>

/**
 * TODO
 * MyDayList 컴포넌트 만들기
 * CompletedTaskList를 분리하지 않음
 *
 *
 */
