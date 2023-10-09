import { useState } from "react";

const Searchbar = () => {
  const [searchContent, setSearchContent] = useState("");

  const searchHandler = (event) => {
    setSearchContent(event.target.value);
  };

  return (
    <div className="flex">
      <input onChange={searchHandler} />
    </div>
  );
};

export default Searchbar;
