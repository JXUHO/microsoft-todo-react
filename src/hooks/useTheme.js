import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTheme = () => {
  const currentTheme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (htmlElement) {
      if (currentTheme === "light") {
        htmlElement.setAttribute("data-theme", "light");
      } else if (currentTheme === "dark") {
        htmlElement.setAttribute("data-theme", "dark");
      }
    }
  }, [currentTheme]);
};

export default useTheme;
