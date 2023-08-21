import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";

const RootPage = () => {
  const [collapse, setCollapse] = useState({ sidebar: false, detail: false });

  const collapseSidebarHandler = () => {
    setCollapse((prevState) => !prevState.sidebar);
  };

  const openDetailHandler = () => {
    setCollapse((prevState) => ({...prevState, detail: true}));
  };

  const closeDetailHandler = () => {
    setCollapse((prevState) => ({...prevState, detail: false}));
  };

  return (
    <>
      <Header />
      {collapse.sidebar && <Sidebar onCollapse={collapseSidebarHandler} />}

      <Outlet context={[collapse, setCollapse]} />

      {collapse.detail && <TaskDetail onCloseDetail={closeDetailHandler} />}
    </>
  );
};

export default RootPage;

// <Outlet/> -> useOutletContext를 통해 collapse에 접근
/**
 * collapse도 redux로 넘기기...?
 * 
 */
