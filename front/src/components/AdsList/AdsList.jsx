import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient"; // Import apiClient
import "./AdsList.css";

// Enums for dropdown options
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

const AdsList = () => {
  const [adsData, setAdsData] = useState({
    ads: [],
    totalPages: 1,
    loading: true,
    error: null,
  });
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
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [isFiltered, setIsFiltered] = useState(false); // Track if filters are applied
  const [showFilters, setShowFilters] = useState(false); // Track if filters are visible
  const navigate = useNavigate();

  const fetchAds = async (page = 1, filters = null) => {
    try {
      setAdsData((prev) => ({ ...prev, loading: true, error: null }));

      // Формируем параметры запроса
      const queryParams = new URLSearchParams(
        filters
          ? { ...filters } // Если есть фильтры, отправляем только их
          : { page } // Если фильтров нет, отправляем только страницу
      ).toString();

      const endpoint = filters
        ? `/ads/filtered?${queryParams}` // Эндпоинт для фильтрованных данных
        : `/ads/page?page=${page}`; // Эндпоинт для пагинации

      const response = await apiClient.get(endpoint);
      console.log(response);

      setAdsData({
        ads: response.data.data.ads || [],
        totalPages: response.data.data.total_pages || 1,
        loading: false,
        error: null,
      });
    } catch (e) {
      setAdsData((prev) => ({
        ...prev,
        loading: false,
        error: "Ошибка загрузки данных.",
      }));
    }
  };

  useEffect(() => {
    if (!isFiltered) {
      fetchAds(currentPage); // Загружаем данные с пагинацией, если фильтры не применены
    }
  }, [currentPage, isFiltered]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setIsFiltered(true); // Устанавливаем флаг фильтрации

    // Удаляем пустые значения из объекта фильтров
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    await fetchAds(null, activeFilters); // Отправляем запрос с фильтрами (без страницы)
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
    setCurrentPage(1); // Reset to the first page
    setIsFiltered(false); // Reset to unfiltered state
    fetchAds(1); // Fetch unfiltered ads
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= adsData.totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev); // Toggle visibility of filters
  };

  if (adsData.loading) return <div className="loading-spinner">Загрузка...</div>;
  if (adsData.error) return <p className="error-message">{adsData.error}</p>;

  return (
    <div className="ads-list-container">
      <button className="toggle-filters-button" onClick={toggleFilters}>
        {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
      </button>

      {showFilters && (
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
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Цвет</option>
              {Object.entries(ColorEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Трансмиссия</option>
              {Object.entries(TransmissionEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <select
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Модель</option>
              {Object.entries(CarModelEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
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
      )}

      <div className="ads-list">
        {adsData.ads.length > 0 ? (
          adsData.ads.map((ad) => (
            <article key={ad.id} className="ad-card">
              <img
                className="ad-card__image"
                src={ad.car.image_url || "https://via.placeholder.com/150"}
                alt={ad.car.name || "Без названия"}
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

      {!isFiltered && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </button>
          <span className="pagination-info">
            Страница {currentPage} из {adsData.totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === adsData.totalPages}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default AdsList;
