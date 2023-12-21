import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCtrl, setShift } from "../store/modifierSlice";


const useKeyDown = () => {
  console.log('useKeyDown hook trigger');
  const dispatch = useDispatch()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === "Control") {
        dispatch(setCtrl(true));
      } else if (e.key === "Shift") {
        dispatch(setShift(true));
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "Shift") {
        dispatch(setShift(false));
      }
      if (e.key === "Control") {
        dispatch(setCtrl(false));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const onBlur = () => {
      dispatch(setCtrl(false));
      dispatch(setShift(false));
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, []);

}


export default useKeyDown