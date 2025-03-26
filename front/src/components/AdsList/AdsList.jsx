import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient"; // Import apiClient
import "./AdsList.css";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    min_price: "",
    max_price: "",
    min_year: "",
    max_year: "",
    min_mileage: "",
    max_mileage: "",
    color: "",
    transmission: "",
    steering_wheel_side: "",
    model: "",
  });
  const navigate = useNavigate();

  const fetchAds = async (url) => {
    try {
      const response = await apiClient.get(url);
      setAds(response.data.data);
    } catch (e) {
      setError(`Ошибка загрузки объявлений: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds("/ads/all");
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {})
    ).toString();

    fetchAds(`/ads/filtered?${queryParams}`);
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      min_price: "",
      max_price: "",
      min_year: "",
      max_year: "",
      min_mileage: "",
      max_mileage: "",
      color: "",
      transmission: "",
      steering_wheel_side: "",
      model: "",
    });
    fetchAds("/ads/all");
  };

  if (loading) return <p className="loading-message">Загрузка объявлений...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="ads-list-container">
      <form className="filter-form" onSubmit={handleFilterSubmit}>
        <h2 className="filter-title">Фильтр объявлений</h2>
        <div className="filter-row">
          <input
            type="text"
            name="name"
            placeholder="Название"
            value={filters.name}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="min_price"
            placeholder="Мин. цена"
            value={filters.min_price}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="max_price"
            placeholder="Макс. цена"
            value={filters.max_price}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-row">
          <input
            type="number"
            name="min_year"
            placeholder="Мин. год"
            value={filters.min_year}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="max_year"
            placeholder="Макс. год"
            value={filters.max_year}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="min_mileage"
            placeholder="Мин. пробег"
            value={filters.min_mileage}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="number"
            name="max_mileage"
            placeholder="Макс. пробег"
            value={filters.max_mileage}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-row">
          <input
            type="text"
            name="color"
            placeholder="Цвет"
            value={filters.color}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="transmission"
            placeholder="Трансмиссия"
            value={filters.transmission}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="steering_wheel_side"
            placeholder="Сторона руля"
            value={filters.steering_wheel_side}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="model"
            placeholder="Модель"
            value={filters.model}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-actions">
          <button type="submit" className="filter-button">
            Найти
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={handleResetFilters}
          >
            Сбросить
          </button>
        </div>
      </form>

      <div className="ads-list">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <article key={ad.id} className="ad-card">
              <img
                className="ad-card__image"
                src={ad.car.image_url}
                alt={ad.car.name}
              />
              <div className="ad-card__content">
                <h2 className="ad-card__title">
                  {ad.car.model} {ad.car.name} {ad.car.year}
                </h2>
                <ul className="ad-card__details">
                  <li>{ad.car.transmission}</li>
                  <li>{ad.car.mileage} км</li>
                  <li>{ad.car.steering_wheel_side} руль</li>
                </ul>
                <p className="ad-card__description">
                  {ad.car.description.slice(0, 60)}
                  {ad.car.description.length > 60 && "..."}
                </p>
                <p className="ad-card__price">{ad.car.price} ₽</p>
              </div>
              <button
                className="ad-card__button"
                onClick={() => navigate(`/ads/${ad.id}`)}
              >
                Подробнее
              </button>
            </article>
          ))
        ) : (
          <p className="no-ads-message">Нет доступных объявлений.</p>
        )}
      </div>
    </div>
  );
};

export default AdsList;
