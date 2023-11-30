import { useEffect, useRef, useState } from "react";
import { FiPaperclip } from "react-icons/Fi";

const DetailAddFile = () => {

  const [inputFile, setInputFile] = useState()
  const inputRef = useRef()

  const addFileClickHandler = (event) => {
    if (event.target.id !== "fileAttachLabel") {
      inputRef.current.click()
    }
  }

  const inputFileSaveHandler = (event) => {
    setInputFile(event.target.files[0])
  }

  // useEffect(() => {
  //   console.log(inputFile);
  // }, [inputFile])
  

  return (
    <div
      className="flex bg-white w-full rounded my-2 p-4 items-center justify-between text-ms-light-text hover:bg-ms-white-hover hover:text-black"
      onClick={addFileClickHandler}
    >
      <div className="flex w-full items-center">
        <FiPaperclip size="16px" style={{transform: "rotate(180deg)"}}/>
         <input ref={inputRef} type="file" id="fileAttach" style={{display:'none'}} onChange={inputFileSaveHandler}/>
        <label id="fileAttachLabel" htmlFor="fileAttach" className="mx-4">Add File</label>

      </div>
    </div>
  );
};

export default DetailAddFile;
