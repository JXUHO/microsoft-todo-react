import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <ul>
        <li>app launcher</li>
        <li>
          <Link to="/">To do</Link>
        </li>
      </ul>
      <Searchbar />
      <ul>
        <li>Settings</li>
        <li>Help</li>
        <li>What's new</li>
        <li>Account Manager</li>
      </ul>

    </div>
  );
};

export default Header;

/**
 * TODO
 * add search bar
 *
 */
