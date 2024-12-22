import "./LoginForm.css";
import axios from "axios";
import { useState } from "react";

const LoginForm = (showRegisterForm) => {
  //     const handleLogin = async (e) => {
  //         e.preventDefault(); // Отключаем перезагрузку страницы

  //         try {
  //           const response = await axios.post("http://localhost:8000/auth/login", {
  //             email: email,
  //             password: password,
  //           });

  //           if (response.status === 200) {
  //             console.log("Токен:", response.data.token); // Здесь вы можете сохранить токен в localStorage или context
  //           }
  //         } catch (error) {
  //           console.error("Ошибка:", error);
  //         }
  //       };

  //   return (
  //     <form>
  //         <div className="login-form">
  //             <h1 className="login-header">Войти в аккаунт</h1>
  //             <input type="text" className="login-input" placeholder="Имя" />
  //             <input type="password" className="login-input" placeholder="Пароль" />
  //             <button type="submit" className="submit-button">Войти</button>
  //             <p>Еще нет аккаунта?<a href="#" onClick={showRegisterForm} className="link">Создай!</a></p>
  //         </div>
  //     </form>
  //   );
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Отключаем перезагрузку страницы

    const apiUrl = "http://localhost:8000/auth/login";

    try {
      const params = new URLSearchParams({
        name: name,
        password: password,
      }).toString(); // Преобразуем объект в строку параметров
      const response = await axios.post(`${apiUrl}?${params}`, {
        withCredentials: true,
      }); // Добавляем строку параметров к URL

      if (response.status === 200) {
        setMessage("Логин успешно выполнен!");
      } else {
        setMessage("Ошибка при логине.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Неверный email или пароль.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-header">Вход в аккаунт</h1>
        <div>
          <input
            type="text"
            id="email"
            placeholder="Логин"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Войти
        </button>
        <p>
          Еще нет аккаунта?
          <a href="#" onClick={showRegisterForm} className="link">
            Создай!
          </a>
        </p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
