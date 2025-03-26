import { useState } from "react";
import axios from "axios";
import "./CreateAd.css";

const AdForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const apiUrl = "http://localhost:8000/ads/create";

    try {
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

      const queryParams = new URLSearchParams(newAd).toString();

      await axios.post(
        `${apiUrl}?${queryParams}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Объявление о машине создано успешно!");
      setFormData({
        name: "",
        model: "",
        price: "",
        mileage: "",
        year: "",
        transmission: "",
        description: "",
        steering_wheel_side: "",
        color: "",
        image_url: "",
      });
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data
          ? err.response.data.detail || "Что-то пошло не так"
          : "Ошибка при создании объявления о машине";

      setError(`Ошибка: ${errorMessage}. URL: ${apiUrl}`);
    }
  };

  return (
    <div className="create-ad-container">
      <h1 className="create-ad-title">Создать объявление</h1>
      <form className="create-ad-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Имя</label>
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
            <input
              id="model"
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="form-input"
              required
            />
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
            <input
              id="transmission"
              type="text"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="steering_wheel_side" className="form-label">Сторона руля</label>
            <input
              id="steering_wheel_side"
              type="text"
              name="steering_wheel_side"
              value={formData.steering_wheel_side}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="color" className="form-label">Цвет</label>
            <input
              id="color"
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="form-input"
              required
            />
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
        <button type="submit" className="submit-button">Создать объявление</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AdForm;