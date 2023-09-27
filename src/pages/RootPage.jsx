import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useSelector } from "react-redux";

import classes from "./RootPage.module.css";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);

  return (
    <div className="flex flex-col h-full bg-ms-background"> {/**root */}

      <Header />

      <div className="flex flex-row flex-1">   {/**app */}

        {isSidebarOpen && <Sidebar />}  {/**left column */}

        <div className="flex-1 flex-col bg-ms-background">
          <Outlet />   {/**center column */}
        </div>

        {isDetailOpen && <TaskDetail />}   {/**right column */}

      </div>

    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 conditional style 적용하기
 *
 */
