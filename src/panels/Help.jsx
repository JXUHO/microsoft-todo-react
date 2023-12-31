import { useDispatch, useSelector } from "react-redux";
import Panel from "../components/ui/Panel";
import { BsXLg } from "react-icons/bs";
import { setHeaderButton } from "../store/uiSlice";

const Help = () => {
  const dispatch = useDispatch();
  const isHelpActive = useSelector((state) => state.ui.helpActive);

  return (
    <>
      {isHelpActive && (
        <Panel>
          <div className="animate-slideInFrames overflow-x-hidden overflow-y-auto flex flex-col">
            <div className="flex justify-between">
              <h2 className="py-5 px-4 text-xl font-semibold">Help</h2>
              <button
                className="flex items-center justify-center hover:bg-ms-button-hover mr-1 mt-3 w-10 h-10 "
                onClick={() => dispatch(setHeaderButton({property:"helpActive", value:false}))}
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

export default Help;
