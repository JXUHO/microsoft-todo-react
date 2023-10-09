import { FiPaperclip } from "react-icons/Fi";

const DetailAddFile = () => {

  return (
    <div
      className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
      onClick={null}
    >
      <div className="flex w-full items-center">
        <FiPaperclip size="16px" style={{transform: "rotate(180deg)"}}/>
        <span className="mx-4">Add File</span>
      </div>
    </div>
  );
};

export default DetailAddFile;
