import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={classes.sidebar}>
      <div>
        <button
          onClick={() => {
            props.onCollapse();
          }}
        >
          open/close
        </button>
      </div>
      <div>
        <nav className={classes}>
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
              <NavLink to="/assigned_to_me">Assinged to me</NavLink>
            </li>
            <li>
              <NavLink to="/flagged">Flagged email</NavLink>
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
