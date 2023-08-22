import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.leftGroup}>
          <li>app launcher</li>
          <li>
            <Link to="/">To do</Link>
          </li>
        </ul>

          <div className={classes.searchBar}>
            <Searchbar />
          </div>

        <ul className={classes.rightGroup}>
          <li>Settings</li>
          <li>Help</li>
          <li>What's new</li>
          <li>Account Manager</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

/**
 * TODO
 * add search bar
 *
 */
