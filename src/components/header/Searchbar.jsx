import { useRef } from "react";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";

const Searchbar = () => {
  const [searchContent, setSearchContent] = useState("");
  const inputRef = useRef()
  const [isFocus, setIsFocus] = useState(false)

  const searchHandler = (event) => {
    setSearchContent(event.target.value);
  };

  const clickHandler = () => {
    console.log('trigger');

    inputRef.current.focus()
  }


  return (
    <div
      className="flex items-center h-8 w-100 rounded-md bg-white z-10 hover:bg-ms-white-hover hover:h-2.1 text-black"
      onClick={clickHandler}
    >
      <button className="z-20 text-ms-blue mx-2">
        <VscSearch size="16px" />
      </button>

        <input
          className="flex-1 rounded-r-md outline-none bg-transparent"
          onChange={searchHandler}
          placeholder={isFocus? "Search" : ""}
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <button className="flex items-center justify-center w-8 h-full"><BsX size="16px" className="text-ms-light-text"/></button>
    </div>
  );
};

export default Searchbar;
