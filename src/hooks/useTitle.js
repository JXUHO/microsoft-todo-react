import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useTitle = () => {
  const location = useLocation();
  const activeTasks = useSelector((state) => state.active.activeTasks);
  const searchQuery = useSelector((state) => state.search.query);
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    if (activeTasks.length === 1) {
      const todo = todos.find((todo) => todo.id === activeTasks[0]);
      document.title = `${todo.task} - To Do`;
    } else if (location.pathname.includes("search")) {
      document.title = `Searching for "${searchQuery}" - To Do`;
    } else {
      let text =
        location.pathname.replaceAll("/", "").charAt(0).toUpperCase() +
        location.pathname.replaceAll("/", "").slice(1);

      switch (text) {
        case "Today":
          text = "My Day";
          break;
        case "Myday":
          text = "My Day";
          break;
        case "Usersignin":
          text = "Sign in";
          break;
        case "Usersignup":
          text = "Sign up";
          break;
        default:
          break;
      }

      document.title = `${text} - To Do`;
    }
  }, [location, activeTasks, searchQuery]);
};

export default useTitle;
