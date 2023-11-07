import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setHeaderButton } from "../store/uiSlice";

const AccountManager = () => {
  const dispatch = useDispatch()
  const accountManagerRef = useRef();
  const isAccountManagerActive = useSelector(
    (state) => state.ui.accountManagerActive
  );

  useEffect(() => {
    const closeModalOnClickOutside = (event) => {
      if (
        accountManagerRef.current &&
        !accountManagerRef.current.contains(event.target)
      ) {
        if (event.target.closest("#accountManagerButton")) {
          return;
        }
        dispatch(setHeaderButton({property:"accountManagerActive", value:false}));
      }
    };
    if (isAccountManagerActive) {
      document.addEventListener("click", closeModalOnClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", closeModalOnClickOutside, true);
    };
  }, [isAccountManagerActive]);


  return (
    <>
      {isAccountManagerActive && (
        <div
          ref={accountManagerRef}
          className="absolute w-80 bg-white right-0 top-12 z-40 animate-fadeFillSlow delay-0 max-w-full"
          style={{
            boxShadow:
              "0 24px 54px rgba(0,0,0,.15), 0 4.5px 13.5px rgba(0,0,0,.08)",
            color: "#333",
            height: "180px",
            transition: "visibility 0s linear 120ms,opacity 120ms ease",
          }}
        >
          <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_3fr] leading-normal items-stretch h-full">
            <div className="col-start-1 col-end-2 self-center text-sm px-4">
              Welcome!
            </div>
            <div className="col-start-1 col-end-4 min-h-[132px self-center] flex">
              <div className="w-20 h-20 m-5  overflow-hidden">
                <img src="public\profile_image.svg" alt="profile image" />
              </div>
              <div className="flex-grow pr-3 mt-4">
                <div className="font-semibold text-lg">Juho Lee</div>
                <div className="mt-1 font-semibold">jxuholee@gmail.com</div>
              </div>
            </div>
            <div className="col-start-3 col-end-4 row-start-1 p-3 text-sm self-center font-semibold hover:bg-ms-white-hover hover:underline hover:cursor-pointer">
              sign out
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountManager;
