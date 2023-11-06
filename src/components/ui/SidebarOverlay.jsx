import { useDispatch, useSelector } from "react-redux";
import useViewport from "../../hooks/useViewPort";
import { closeDetail, closeSidebar } from "../../store/uiSlice";

const SidebarOverlay = () => {
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector((state) => state.ui.sidebar);
  const isDetailOpen = useSelector((state) => state.ui.detail);
  const { width: viewportWidth } = useViewport();
  const detailWidth = useSelector((state) => state.ui.detailWidth);

  const overlayClickHandler = () => {
    dispatch(closeDetail());
    dispatch(closeSidebar());
  };

  return (
    <>
      {viewportWidth - detailWidth < 560 && (isSidebarOpen || isDetailOpen) && (
        <div
          className="absolute w-full h-full z-20 opacity-40 animate-fadeFill"
          style={{ backgroundColor: "#333" }}
          onClick={overlayClickHandler}
        ></div>
      )}
    </>
  );
};

export default SidebarOverlay;
