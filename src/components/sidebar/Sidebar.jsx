import { NavLink, useLocation,  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSidebar } from "../../store/uiSlice";
import {  AiOutlineMail,  } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { GoPeople, GoCheckCircle } from "react-icons/go";
import { PiCheckFatLight,  } from "react-icons/pi";
import {BsSun, BsStar} from "react-icons/bs"
import {RxHamburgerMenu} from "react-icons/rx"
import {GoHome} from "react-icons/go"
import { useEffect, useState } from "react";
import classes from "./Sidebar.module.css"

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState("")

  const closeSidebarHandler = () => {
    dispatch(closeSidebar());
  };

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])

  return (
    <div className=" flex flex-col w-72 bg-white z-40 shadow-ms-bg-shadow">
      <div className="flex items-center flex-shrink-0 justify-between px-6 h-12 mt-4">
        <button onClick={closeSidebarHandler}>
          <RxHamburgerMenu size="20px" />
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden pt-1">
        <nav className="overflow-x-hidden overflow-y-auto relative text-sm">
          <ul>
            <li>
              <NavLink to="/myday" >
                <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6 active:bg-ms-active-blue active:font-semibold">
                  <div>
                    <BsSun size="16px"/>
                  </div>
                  <span className="ml-4">My Day</span>
                  <div></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/important">
                <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
                  <div>
                    <BsStar size="16px"/>
                  </div>
                  <span className="ml-4">
                    Important
                  </span>
                  <div></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/planned">
                <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
                  <div>
                  <IoCalendarOutline size="16px"/>
                  </div>
                  <span className="ml-4">Planned</span>
                  <div></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed">
                <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
                  <div>
                    <GoCheckCircle size="16px"/>
                  </div>
                  <span className="ml-4">
                    Completed
                  </span>
                  <div></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/inbox">
                <div className="flex items-center cursor-pointer hover:bg-ms-white-hover py-3 px-6">
                  <div>
                    <GoHome size="16px"/>
                  </div>
                  <span className="ml-4">Tasks</span>
                  <div></div>
                </div>
              </NavLink>
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

/** 
 * TODO
 * 
 * 현재 위치한 탭 active 색깔 변경하기, 폰트 semibold로 변경하기
 * navlint isActive 이용하는 방법 / state 활용해서 수동으로 스타일 추가하는 방법 / 제 3의 방법 찾아서 해결하기
 * 
 * 
 */