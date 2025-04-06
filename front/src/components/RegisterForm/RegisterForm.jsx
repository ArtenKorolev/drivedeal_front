import React, { useState } from "react";
import apiClient from "../../apiClient"; // Import apiClient
import "./RegisterForm.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      phone_number: phoneNumber,
    };

    try {
      const response = await apiClient.post("/auth/register", data);

      if (response.status === 200) {
        const { access_token: token, refresh_token: ref } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", ref);
        window.location.reload();
        alert("Регистрация успешна!");
      } else {
        console.log(response);
        alert("Ошибка регистрации. Пожалуйста, попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Сетевая ошибка.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header">Регистрация</h1>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Логин
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="Введите логин"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="form-input"
            placeholder="Введите номер телефона"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Введите пароль"
          />
        </div>
        <button className="submit-button" type="submit">
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
