import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addQuery, initializeQuery } from "../../store/searchSlice";

const Searchbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const searchQuery = useSelector(state => state.search.query)
  const dispatch = useDispatch()

  const searchHandler = (event) => {
    // setUserInput(event.target.value);
    dispatch(addQuery(event.target.value));
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const clickHandler = () => {
    if (!isActive) {
      setIsActive(true);
      dispatch(initializeQuery());
    }
  };
  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const blurHandler = () => {
    if (location.pathname === "/search" && searchQuery === "") {
      navigate("/myday");
    }
    if (location.pathname !== "/search") {
      setIsActive(false);
    }
  };

  const clearButtonHandler = () => {
    setIsActive(false);
    dispatch(initializeQuery());
    if (location.pathname === "/search") {
      navigate("/myday");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/search") {
      setIsActive(false);
    }
  }, [location]);

  return (
    <div
      className="flex items-center h-8 w-100 rounded-md bg-white z-10 hover:bg-ms-white-hover hover:h-2.1 text-black"
      onClick={clickHandler}
    >
      <button className="z-20 text-ms-blue mx-2">
        <VscSearch size="16px" />
      </button>

      {isActive && (
        <div className="flex flex-1 items-center h-full rounded-md">
          <input
            className="flex-1 rounded-r-md outline-none bg-transparent"
            onChange={searchHandler}
            placeholder={"Search"}
            ref={inputRef}
            onBlur={blurHandler}
            value={searchQuery}
          />
          <button
            className="flex items-center justify-center w-8 h-full"
            onClick={clearButtonHandler}
          >
            <BsX size="16px" className="text-ms-light-text" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbar;

/**
 * TODO
 * seachbar active된 상태에서 clear버튼 누르면 searchbar clear -> isActive==false에 따른 flickering 발생
 * location 변화에 따라 useEffect hook trigger되므로, 성능에 악영향
 */

