import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setAppLauncherActive } from "../store/uiSlice";
import { useEffect, useRef } from "react";

  const AppLauncher = () => {
    const dispatch = useDispatch();
    const appLauncherRef = useRef();
    const appLauncherActive = useSelector((state) => state.ui.appLauncherActive);


    useEffect(() => {
      const closeModalOnClickOutside = (event) => {
        if (
          appLauncherRef.current &&
          !appLauncherRef.current.contains(event.target)
        ) {
          dispatch(setAppLauncherActive(false));
        }
      };
      if (appLauncherActive) {
        document.addEventListener("click", closeModalOnClickOutside, true);
      }
      return () => {
        document.removeEventListener("click", closeModalOnClickOutside, true);
      };
    }, [appLauncherActive]);
    

    return (
      <>
        {appLauncherActive && (
          <div
            className="flex flex-col fixed z-50 bg-white w-80 min-w-[320px] max-w-[320px] top-0 left-0 right-auto h-screen origin-top-left animate-slideInFrames overflow-y-auto"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px",
            }}
            ref={appLauncherRef}
          >
            <div>
              <button
                className="m-4 p-1.5 rounded hover:bg-ms-white-hover transition-colors ease-linear duration-100"
                onClick={() => dispatch(setAppLauncherActive(false))}
              >
                <TbGridDots size="20px" />
              </button>
            </div>
            <div className="mx-5 my-3">
              <h2 className="text-lg">Dev Logs</h2>
            </div>
          </div>
        )}
      </>
    );
  };

export default AppLauncher;
