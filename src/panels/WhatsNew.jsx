import { useDispatch, useSelector } from "react-redux";
import Panel from "../components/ui/Panel";
import { BsXLg } from "react-icons/bs";
import { setHeaderButton } from "../store/uiSlice";

const WhatsNew = () => {
  const dispatch = useDispatch();
  const isWhatsNewActive = useSelector((state) => state.ui.whatsNewActive);

  return (
    <>
      {isWhatsNewActive && (
        <Panel>
          <div className="animate-slideInFrames overflow-x-hidden overflow-y-auto flex flex-col">
            <div className="flex justify-between">
              <h2 className="py-5 px-4 text-xl font-semibold">What's new</h2>
              <button
                className="flex items-center justify-center hover:bg-ms-button-hover mr-1 mt-3 w-10 h-10 "
                onClick={() => dispatch(setHeaderButton({property:"whatsNewActive", value:false}))}
              >
                <BsXLg size='16px'/>
              </button>
            </div>
          </div>
        </Panel>
      )}
    </>
  );
};

export default WhatsNew;
