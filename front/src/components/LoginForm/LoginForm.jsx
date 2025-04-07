import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/authService";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUsername = await AuthService.login(username, password);
      onLogin(loggedInUsername);
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setError("Неверный логин или пароль.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-header">Вход в аккаунт</h1>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Логин</label>
          <input
            type="text"
            id="username"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Войти</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <p className="register-prompt">
        Нет аккаунта?{" "}
        <Link to="/register" className="register-link">
          Создай!
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;