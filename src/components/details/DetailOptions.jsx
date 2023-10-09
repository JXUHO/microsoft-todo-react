import { BsRepeat, BsSun } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";

const DetailOptions = () => {
  return (
    <>
      <div
        className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
        onClick={null}
      >
        <div className="flex w-full items-center ">
          <BsSun size="16px" />
          <span className="mx-4">Add to My Day</span>
        </div>
      </div>

      <div className="rounded my-2">
        <div
          className="flex bg-white w-full  p-4  items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          style={{ borderBottom: "solid 0.5px #edebe9" }}
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <VscBell size="17px" color="#797775" />
            <span className="mx-4">Remind me</span>
          </div>
        </div>
        <div
          className="flex bg-white w-full p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          style={{ borderBottom: "solid 0.5px #edebe9" }}
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <IoCalendarOutline size="17px" color="#797775" />
            <span className="mx-4">Add due date</span>
          </div>
        </div>
        <div
          className="flex bg-white w-full p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
          onClick={null}
        >
          <div className="flex w-full items-center ">
            <BsRepeat size="17px" color="#797775" />
            <span className="mx-4">Repeat</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOptions;
