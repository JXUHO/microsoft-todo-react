import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const RootPage = () => {
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  const collapseSidebarHandler = () => {
    setCollapseSidebar(prevState => !prevState)
  }

  return(
    <>
    <Header />
    {collapseSidebar && <Sidebar onCollapse={collapseSidebarHandler}/>}
    <Outlet context={[collapseSidebar, setCollapseSidebar]} />
    </>
  )
}

export default RootPage;


// <Outlet/> -> useOutletContext참조