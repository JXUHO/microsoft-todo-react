import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
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
    </>
  );
};

export default Sidebar;
