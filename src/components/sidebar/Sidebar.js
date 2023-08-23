import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../store/uiSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const closeSidebarHandler = () => {
    dispatch(closeSidebar());
  };

  return (
    <div className={classes.sidebar}>
      <div>
        <button onClick={closeSidebarHandler}>open/close</button>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/myday">My Day</NavLink>
            </li>
            <li>
              <NavLink to="/important">Important</NavLink>
            </li>
            <li>
              <NavLink to="/planned">Planned</NavLink>
            </li>
            <li>
              <NavLink to="/completed">Completed</NavLink>
            </li>
            <li>
              <NavLink to="/inbox">Tasks</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <footer>
        <p>OL</p>
        <p>Cal</p>
        <p>PPL</p>
        <p>TODO</p>
      </footer>
    </div>
  );
};

export default Sidebar;
