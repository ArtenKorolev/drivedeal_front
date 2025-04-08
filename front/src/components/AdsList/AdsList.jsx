import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdsList = ({ adsData, handleResetFilters, handlePageChange, currentPage, isFiltered }) => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="ads-container">
      <button className="toggle-filters-button" onClick={toggleFilters}>
        {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
      </button>

      {showFilters && (
        <form className="filters-form">
          <div className="filters">
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
