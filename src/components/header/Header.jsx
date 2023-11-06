import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { TbGridDots } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { RxQuestionMark } from "react-icons/rx";
import { TbSpeakerphone } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import useViewport from "../../hooks/useViewPort";
import { setAppLauncherActive } from "../../store/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isSearchbarActive = useSelector((state) => state.ui.isSearchbarActive);
  const { width: viewportWidth } = useViewport();

  return (
    <div className="flex flex-row justify-between items-center h-12 text-white bg-ms-blue hover:cursor-pointer">
      <div
        className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100"
        onClick={() => dispatch(setAppLauncherActive(true))}
        title="App launcher"
      >
        <TbGridDots size="20px" />
      </div>

      <div className="flex flex-1 justify-start items-center">
        <div className="pl-2 pr-3 hover:underline text-base font-semibold whitespace-nowrap">
          <Link to="/">To Do</Link>
        </div>
        <Searchbar />

        {!(isSearchbarActive && viewportWidth < 430) && (
          <div className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100" title="Settings">
            <AiOutlineSetting size="20px" />
          </div>
        )}
        {!(isSearchbarActive && viewportWidth < 478) && (
          <div className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100" title="Help">
            <RxQuestionMark size="20px" />
          </div>
        )}
        {!(isSearchbarActive && viewportWidth < 525) && (
          <div className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100" title="What's new">
            <TbSpeakerphone size="20px" />
          </div>
        )}
      </div>
      {!(isSearchbarActive && viewportWidth < 400) ? (
        <div className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100" title="Account manager">
          <CgProfile size="20px" />
        </div>
      ) : (
        <div className="w-8"></div>
      )}
    </div>
  );
};

export default Header;
