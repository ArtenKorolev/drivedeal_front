import { useReducer, useState } from "react";
import apiClient from "../../apiClient"; // Используем apiClient
import "./CreateAd.css";

const TransmissionEnum = {
  MANUAL: "MT",
  AUTOMATIC: "AT",
  SEMI_AUTOMATIC: "SAT",
  CVT: "CVT",
  DUAL_CLUTCH: "DCT",
};

const ColorEnum = {
  RED: "Красный",
  GREEN: "Зеленый",
  BLUE: "Синий",
  YELLOW: "Желтый",
  BLACK: "Черный",
  WHITE: "Белый",
  PURPLE: "Фиолетовый",
  ORANGE: "Оранжевый",
};

const CarModelEnum = {
  TOYOTA: "Toyota",
  HONDA: "Honda",
  BMW: "BMW",
  MERCEDES: "Mercedes-Benz",
  FORD: "Ford",
  AUDI: "Audi",
  VOLKSWAGEN: "Volkswagen",
  NISSAN: "Nissan",
  TESLA: "Tesla",
  CHEVROLET: "Chevrolet",
};

const SteeringWheelEnum = {
  LEFT: "Левый",
  RIGHT: "Правый",
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const formReducer = (state, action) => {
  return { ...state, [action.name]: action.value };
};

const AdForm = () => {
  const [formData, dispatch] = useReducer(formReducer, {
    name: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    transmission: "",
    description: "",
    steering_wheel_side: "",
    color: "",
    image_url: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (formData.price <= 0 || formData.mileage < 0 || formData.year < 1886) {
        setError("Пожалуйста, введите корректные данные.");
        return;
      }

      if (!isValidUrl(formData.image_url)) {
        setError("Пожалуйста, введите корректный URL изображения.");
        return;
      }

      const newAd = {
        ...formData,
        price: parseInt(formData.price, 10),
        mileage: parseInt(formData.mileage, 10),
        year: parseInt(formData.year, 10),
      };

      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Токен авторизации отсутствует. Пожалуйста, войдите в систему.");
        return;
      }

      // Преобразуем параметры в строку query
      const queryParams = new URLSearchParams(newAd).toString();

      // Отправляем запрос с query-параметрами
      await apiClient.get(`/ads/create?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Объявление о машине создано успешно!");
      Object.keys(formData).forEach((key) => dispatch({ name: key, value: "" }));
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data
          ? err.response.data.detail || "Что-то пошло не так"
          : "Ошибка при создании объявления о машине";

      setError(`Ошибка: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-ad-container">
      <h1 className="create-ad-title">Создать объявление</h1>
      <form className="create-ad-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Имя <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="model" className="form-label">Модель</label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Модель</option>
              {Object.entries(CarModelEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year" className="form-label">Год выпуска</label>
            <input
              id="year"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">Цена</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mileage" className="form-label">Пробег</label>
            <input
              id="mileage"
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transmission" className="form-label">Тип трансмиссии</label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Тип трансмиссии</option>
              {Object.entries(TransmissionEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="steering_wheel_side" className="form-label">Сторона руля</label>
            <select
              id="steering_wheel_side"
              name="steering_wheel_side"
              value={formData.steering_wheel_side}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Сторона руля</option>
              {Object.entries(SteeringWheelEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="color" className="form-label">Цвет</label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Цвет</option>
              {Object.entries(ColorEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Введите описание автомобиля"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_url" className="form-label">URL изображения</label>
          <input
            id="image_url"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Создание..." : "Создать объявление"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AdForm;