import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>app launcher</li>
            <li>
              <Link to="/">To do</Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

/**
 * TODO
 * add search bar 
 * 
 */
