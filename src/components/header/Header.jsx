import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { TbGridDots } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import {RxQuestionMark} from "react-icons/rx"
import { TbSpeakerphone } from "react-icons/tb"
import {CgProfile} from "react-icons/cg"
const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center h-12 text-white bg-ms-blue">
      <ul className="flex items-center">
        <li className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100">
          <TbGridDots size="20px" />
        </li>
        <li className="pl-2 pr-3 hover:underline text-base font-semibold">
          <Link to="/">To Do</Link>
        </li>
      </ul>

      <Searchbar />
      
      <ul className="flex items-center">
        <li className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100">
          <AiOutlineSetting size="20px"/>
        </li>
        <li className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100">
        <RxQuestionMark size="20px"/>
        </li>
        <li className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100">
        <TbSpeakerphone size="20px"/>
        </li>
        <li className="flex justify-center items-center h-12 w-12 hover:bg-ms-blue-hover transition ease-in-out duration-100">
        <CgProfile size="20px"/>
        </li>
      </ul>
    </div>
  );
};

export default Header;

/**
 * TODO
 * add search bar
 *
 */
