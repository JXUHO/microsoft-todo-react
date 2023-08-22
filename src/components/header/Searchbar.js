import { useState } from "react";
import classes from "./Searchbar.module.css";

const Searchbar = () => {
  const [searchContent, setSearchContent] = useState("");

  const searchHandler = (event) => {
    setSearchContent(event.target.value);
  };

  return (
    <div className={classes.Searchbar}>
      <div>search</div>
      <input onChange={searchHandler} />
    </div>
  );
};

export default Searchbar;
