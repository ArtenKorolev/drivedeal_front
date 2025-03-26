import "./NavBar.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ username }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <Link to="/" className="nav-link logo-link">
          DriveDeal
        </Link>
      </div>
      <div className="nav-buttons">
        <Link to="/create" className="nav-link">
          Продать
        </Link>
        <Link to="/" className="nav-link">
          Купить
        </Link>
        {username ? (
          <Link to="/profile" className="nav-link">
            {username}
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Войти
          </Link>
        )}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  username: PropTypes.string,
};

export default NavBar;