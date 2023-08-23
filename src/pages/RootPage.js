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
    <div className={classes.rootPage}>
      <Header />
      <div className={classes.content}>
        {isSidebarOpen && <Sidebar />}
        <div className={classes.outlet}>
          <Outlet />
        </div>
        {isDetailOpen && <TaskDetail />}
      </div>
    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 conditional style 적용하기
 *
 */
