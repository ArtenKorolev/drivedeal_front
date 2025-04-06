import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../apiClient"; // Используем apiClient
import "./AdDetail.css";

const AdDetails = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const response = await apiClient.get(`/ads/by-id?ad_id=${id}`);
                setAd(response.data.data);
            } catch (e) {
                setError(`Ошибка загрузки объявления: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchAdDetails();
    }, [id]);

    if (loading) return <p className="loading-message">Загрузка объявления...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="ad-details-container">
            <div className="ad-details-header">
                <h1 className="ad-details-title">{ad.car.name}</h1>
                <p className="ad-details-price">{ad.car.price} ₽</p>
            </div>
            <div className="ad-details-content">
                <img
                    className="ad-details-image"
                    src={ad.car.image_url}
                    alt={ad.car.name}
                />
                <div className="ad-details-info">
                    <p><strong>Модель:</strong> {ad.car.model}</p>
                    <p><strong>Год:</strong> {ad.car.year}</p>
                    <p><strong>Трансмиссия:</strong> {ad.car.transmission}</p>
                    <p><strong>Пробег:</strong> {ad.car.mileage} км</p>
                    <p><strong>Руль:</strong> {ad.car.steering_wheel_side}</p>
                    <p><strong>Описание:</strong> {ad.car.description}</p>
                </div>
            </div>
            <div className="ad-details-owner">
                <h2>Контакты владельца</h2>
                <p><strong>Имя:</strong> {ad.owner.name}</p>
                <p><strong>Телефон:</strong> {ad.owner.phone_number}</p>
            </div>
        </div>
    );
};

export default AdDetails;