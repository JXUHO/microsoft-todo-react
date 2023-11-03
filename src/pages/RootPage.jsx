import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/details/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  initializeActiveStep,
  initializeActiveTasks,
} from "../store/activeSlice";
import { closeDetail, closeSidebar } from "../store/uiSlice";
import { updateMydayTodo } from "../store/todoSlice";
import TaskItemContextMenu from "../components/modals/TaskItemContextMenu";
import DeleteTaskDialog from "../components/modals/DeleteTaskDialog";
import useRemindNotification from "../hooks/useRemindNotification";
import useKeyDown from "../hooks/useKeydown";
import useViewport from "../hooks/useViewPort";

const RootPage = () => {
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeActiveTasks());
    dispatch(initializeActiveStep());
    dispatch(closeDetail());
  }, [location]);

  useEffect(() => {
    // reload될 때, 날짜 변경됐으면 myday변경
    updateMydayTodo();
  }, []);

  useKeyDown();
  useRemindNotification();


  /**
   * 1. width가 1024픽셀보다 작아지면 isSidebarOpen를 false로 변경한다
   * 2. 1024 - 920픽셀까지 isSidebarOpen가 true이면 isDetailOpen를 false로, 역도 성립하도록 한다
   * 3. 920픽셀보다 작아지면 TaskDetail, Sidebar component를 열었을 때 검은색 모달 배경을 만들고, 클릭하면 해당 component가 unmount되도록 한다
   * 
   * 900픽셀보다 작아지면 sort, group, suggestions버튼 text render 안함
   * 태블릿 사이즈 - 768px보다 작아지면 detail bar 전체화면 되도록 설정
   * 
   * reference에서는 center column이 550px보다 작아지는 것을 기준으로 overlay render한다
   * 
   * => responsive 기준을 viewport width뿐만 아니라 resizer & detail bar width의 관계도 고려해야 한다
   * 1. responsive 기준을 바꾸거나
   * 2. resizer와 detail bar width가 일치하지 않을 경우에, resizer의 위치를 변경하거나
   * 
   * viewport width - uiSlice detailWidth 길이에 따라 responsive 적용
   * viewport width - uiSlice detailWidth가 500px보다 작아지면
   * viewport - uiSlice detailWidth - 290px가 500px보다 작아지면, 버튼 글씨 제거하고, sidebar 200px로 변경
   * 
   * 
   * sidebar는 viewport width 1010px을 기준으로, 200px과 290px로 전환한다(CSS사용. 독립적)
   * 
   * viewport - detailWidth가 920-360 = 560px이면 sidebar를 접는다 1260 - 700
   * 550px
   * 
   * 
   * TODO
   * viewport width가 450px보다 클때 detailbar의 최대 width가 viewport width - 50px이 된다.
   * 450px보다 같거나 작아질 때는, detailbar가 viewport width가 된다.
   * 
   * header searchbar
   *  
   * 
   */
  const { width: viewportWidth } = useViewport();
  const detailWidth = useSelector((state) => state.ui.detailWidth);


  useEffect(() => {
    if (viewportWidth - detailWidth < 560) {
      // console.log('trigger'); 
      dispatch(closeSidebar());
    } 
  }, [viewportWidth, detailWidth])

  const overlayClickHandler = () => {
    dispatch(closeDetail());
    dispatch(closeSidebar());
  }

  return (
    <div className="flex flex-col bg-ms-background h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">


        {viewportWidth - detailWidth < 560 && (isSidebarOpen || isDetailOpen) && (
          <div
            className="absolute w-full h-full z-20 opacity-40 animate-fadeFill"
            style={{backgroundColor:"#333"}}
            onClick={overlayClickHandler}
          ></div>
        )}



        {isSidebarOpen && <Sidebar />}
        <div className="flex flex-1 flex-col bg-ms-background overflow-hidden">
          <Outlet />
        </div>
        {isDetailOpen && <TaskDetail />}
      </div>

      <TaskItemContextMenu />
      <DeleteTaskDialog />
    </div>
  );
};

export default RootPage;

/**
 * open/close state에 따라 우측 scrollbar conditional style 적용하기
 *
 */
