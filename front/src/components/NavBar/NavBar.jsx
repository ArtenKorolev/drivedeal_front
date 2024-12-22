import "./NavBar.css";
import PropTypes from "prop-types";

const NavBar = ({ showCreateForm, showAdsList, showLoginForm }) => {
  return (
    <div className="nav-bar">
      <div className="logo">
        <p>DriveDeal</p>
      </div>
      <div className="nav-buttons">
        <a href="#" className="nav-link" onClick={showCreateForm}>
          Продать
        </a>
        <a href="#" className="nav-link" onClick={showAdsList}>
          Купить
        </a>
        <a href="#" className="nav-link" onClick={showLoginForm}>
          Войти
        </a>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  showCreateForm: PropTypes.func.isRequired,
  showAdsList: PropTypes.func.isRequired,
  showLoginForm: PropTypes.func.isRequired,
};

export default NavBar;
