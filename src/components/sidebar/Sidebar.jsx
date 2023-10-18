import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../../store/uiSlice";
import { AiOutlineMail } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { GoPeople, GoCheckCircle } from "react-icons/go";
import { PiCheckFatLight } from "react-icons/pi";
import { BsSun, BsStar } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");

  const closeSidebarHandler = () => {
    dispatch(closeSidebar());
  };

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  return (
    <div
      className=" flex flex-col bg-white z-30"
      style={{
        boxShadow:
          "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
        width: "290px",
      }}
    >
      <div className="flex items-center flex-shrink-0 justify-between px-6 h-12 mt-4">
        <button onClick={closeSidebarHandler}>
          <RxHamburgerMenu size="20px" />
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden pt-1">
        <nav className="overflow-x-hidden overflow-y-auto relative text-sm">
          <ul>
            <MyDayListBar currentLocation={currentLocation} />
            <ImportantListBar currentLocation={currentLocation} />
            <PlannedListBar currentLocation={currentLocation} />
            <CompletedListBar currentLocation={currentLocation} />
            <TasksListBar currentLocation={currentLocation} />
            <li>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#edebe9",
                  margin: "9px 16px",
                }}
              />
            </li>
          </ul>
        </nav>
        <div></div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center justify-center py-3 h-12 w-full hover:bg-ms-white-hover">
          <AiOutlineMail />
        </div>
        <div className="flex items-center justify-center py-3 h-12 w-full hover:bg-ms-white-hover">
          <IoCalendarOutline />
        </div>
        <div className="flex items-center justify-center py-3 h-12 w-full hover:bg-ms-white-hover">
          <GoPeople />
        </div>
        <div className="flex items-center justify-center py-3 h-12 w-full hover:bg-ms-white-hover">
          <PiCheckFatLight />
        </div>
      </div>
    </div>
  );
};



export default Sidebar;


const MyDayListBar = ({ currentLocation }) => {
  return currentLocation === "/myday" || currentLocation === "/today" ? (
    <li className="relative before:content-[''] before:w-0.5 before:bg-ms-blue before:absolute before:top-2/4 before:-translate-y-2/4 before:animate-expand">
      <NavLink to="/myday">
        <div className="flex items-center cursor-pointer py-3 px-6 bg-ms-active-blue font-semibold">
          <div>
            <BsSun size="16px" />
          </div>
          <span className="ml-4">My Day</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/myday">
        <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
          <div>
            <BsSun size="16px" />
          </div>
          <span className="ml-4">My Day</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  );
};

const ImportantListBar = ({ currentLocation }) => {
  return currentLocation === "/important" ? (
    <li className="relative before:content-[''] before:w-0.5 before:bg-ms-blue before:absolute before:top-2/4 before:-translate-y-2/4 before:animate-expand">
      <NavLink to="/important">
        <div className="flex items-center cursor-pointer py-3 px-6 bg-ms-active-blue font-semibold">
          <div>
            <BsStar size="16px" />
          </div>
          <span className="ml-4">Important</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/important">
        <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
          <div>
            <BsStar size="16px" />
          </div>
          <span className="ml-4">Important</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  );
};
const PlannedListBar = ({ currentLocation }) => {
  return currentLocation === "/planned" ? (
    <li className="relative before:content-[''] before:w-0.5 before:bg-ms-blue before:absolute before:top-2/4 before:-translate-y-2/4 before:animate-expand">
      <NavLink to="/planned">
        <div className="flex items-center cursor-pointer py-3 px-6 bg-ms-active-blue font-semibold">
          <div>
            <IoCalendarOutline size="16px" />
          </div>
          <span className="ml-4">Planned</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/planned">
        <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
          <div>
            <IoCalendarOutline size="16px" />
          </div>
          <span className="ml-4">Planned</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  );
};
const CompletedListBar = ({ currentLocation }) => {
  return currentLocation === "/completed" ? (
    <li className="relative before:content-[''] before:w-0.5 before:bg-ms-blue before:absolute before:top-2/4 before:-translate-y-2/4 before:animate-expand">
      <NavLink to="/completed">
        <div className="flex items-center cursor-pointer py-3 px-6 bg-ms-active-blue font-semibold">
          <div>
            <GoCheckCircle size="16px" />
          </div>
          <span className="ml-4">Completed</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/completed">
        <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
          <div>
            <GoCheckCircle size="16px" />
          </div>
          <span className="ml-4">Completed</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  );
};
const TasksListBar = ({ currentLocation }) => {
  return currentLocation === "/inbox" ? (
    <li className="relative before:content-[''] before:w-0.5 before:bg-ms-blue before:absolute before:top-2/4 before:-translate-y-2/4 before:animate-expand">
      <NavLink to="/inbox">
        <div className="flex items-center cursor-pointer py-3 px-6 bg-ms-active-blue font-semibold">
          <div>
            <GoHome size="16px" />
          </div>
          <span className="ml-4">Tasks</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink to="/inbox">
        <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
          <div>
            <GoHome size="16px" />
          </div>
          <span className="ml-4">Tasks</span>
          <div></div>
        </div>
      </NavLink>
    </li>
  );
};