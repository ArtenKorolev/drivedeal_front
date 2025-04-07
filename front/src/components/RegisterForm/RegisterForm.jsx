import { useState } from "react";
import apiClient from "../../apiClient"; // Import apiClient
import "./RegisterForm.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", phone: "" });

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]*$/; // Допускает только "+" в начале и цифры
    return phoneRegex.test(phone);
  };

  const validateUsername = (username) => {
    const usernameRegex = /[a-zA-Z]/; // Проверяет, содержит ли хотя бы одну букву
    return usernameRegex.test(username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Валидация полей
    const phoneIsValid = validatePhoneNumber(phoneNumber);
    const usernameIsValid = validateUsername(username);

    if (!phoneIsValid) {
      setErrors((prev) => ({ ...prev, phone: "Номер телефона должен содержать только цифры и начинаться с '+'." }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }

    if (!usernameIsValid) {
      setErrors((prev) => ({ ...prev, username: "Логин должен содержать хотя бы одну букву." }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }

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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (validatePhoneNumber(value)) {
      setPhoneNumber(value);
      setErrors((prev) => ({ ...prev, phone: "" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "Поле может содержать только цифры и '+' первым символом." }));
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
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
            className="form-input"
            placeholder="Введите номер телефона"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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
