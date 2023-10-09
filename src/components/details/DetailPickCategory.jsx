import { PiTag } from "react-icons/pi";

const DetailPickCategory = () => {

  return (
    <div
      className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
      onClick={null}
    >
      <div className="flex w-full items-center">
        <PiTag size="16px" style={{transform: "rotate(90deg)"}}/>
        <span className="mx-4">Pick a Category</span>
      </div>
    </div>
  );
};

export default DetailPickCategory;
