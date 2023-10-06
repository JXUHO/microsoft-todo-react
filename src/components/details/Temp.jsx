import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../../store/todoSlice";
import { closeDetail } from "../../store/uiSlice";
import DetailBody from "./DetailBody";
import { LuPanelRightClose } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";

const TaskDetail = () => {
  const detailId = useSelector((state) => state.ui.id);
  const dispatch = useDispatch();

  const sidebarRef = useRef();
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);

  const closeDetailHandler = () => {
    dispatch(closeDetail());
  };

  const removeTaskHandler = (id) => {
    dispatch(removeTodo(id));
    dispatch(closeDetail());
  };

  const activeResizeHandler = useCallback(() => {
    setIsResizing(true);
  }, []);

  const deactiveResizeHandler = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resizeHandler = useCallback(
    (event) => {
      if (!isResizing) return;
      setSidebarWidth(sidebarRef.current.getBoundingClientRect().right - event.clientX);
    },
    [isResizing]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", deactiveResizeHandler);
    console.log(sidebarWidth);
    return () => {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", deactiveResizeHandler);
    };
  }, [resizeHandler, deactiveResizeHandler]);

  return (
    <div
      className="flex flex-row min-w-[360px] max-w-[700px]"
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div
        className="w-1 absolute z-50 cursor-ew-resize h-full m-0 p-0 box-border bg-ms-scrollbar opacity-0 hover:opacity-40"  // mousedown에서 수정
        onMouseDown={activeResizeHandler}
      ></div>
      <div
        className="flex flex-col w-full"
        style={{
          boxShadow:
            "0px 1.2px 3.6px rgba(0,0,0,0.1), 0px 6.4px 14.4px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <DetailBody id={detailId} />
        </div>
        <div className="flex flex-col  before:content-[''] before:h-[0.5px] before:w-full before:bg-ms-bg-border  before:top-0 before:left-0">
          <div className="flex items-center justify-between py-4 px-0 my-0 mx-6">
            <button onClick={closeDetailHandler} className="">
              <LuPanelRightClose size="16px" />
            </button>

            <p>created time</p>

            <button onClick={() => removeTaskHandler(detailId)}>
              <BsTrash3 size="16px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

/**
 * TODO
 * 받아온 detailId로 detail body 구현 가능
 *
 *
 */
