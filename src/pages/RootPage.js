import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../store/uiSlice";

const RootPage = () => {
  const isSidebarOpen = useSelector(state => state.ui.sidebar)
  const isDetailOpen = useSelector(state => state.ui.detail)
  

  return (
    <>
      <Header />
      {isSidebarOpen && <Sidebar />}
      <Outlet />
      {isDetailOpen && <TaskDetail />}
    </>
  );
};

export default RootPage;

// <Outlet/> -> useOutletContext를 통해 collapse에 접근
/**
 * 어떤 component에서 detail에 접근했는지 알아야함 - props로 넘기기? or redex에서 접근?
 * 
 */
