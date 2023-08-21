import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <nav>
        <ul>
          <li>app launcher</li>
          <li>
            <Link to="/">To do</Link>
          </li>
          <li>
            <Searchbar />
          </li>
          <li>Settings</li>
          <li>Help</li>
          <li>What's new</li>
          <li>Account Manager</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

/**
 * TODO
 * add search bar
 *
 */
