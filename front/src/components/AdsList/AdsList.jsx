import { useEffect, useState } from "react";
import axios from "axios";
import "./AdsList.css";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8000/ads/all");
        setAds(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        setError(`Ошибка загрузки объявлений ${e}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAds()
  }, []);
  
  if (loading) return <p>Загрузка объявлений...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="ads-wrapper">
        {ads.cars.length > 0 ? (
          ads.cars.map((ad) => (
            <div key={ad.id} className="ad">

              <img
                className="car-image"
                src={ad.image_url}
                alt={ad.name}
              />

              <div className="car-info">
                <p>
                  {ad.model} {ad.name} {ad.year} {ad.transmission}
                </p>
                <p>{ad.mileage} км</p>
                <p>{ad.steering_wheel_side} руль</p>
                <p className="car-description">{ad.description}</p>
                <p className="car-price">{ad.price} ₽</p>
              </div>

            </div>
          ))
        ) : (
          <p>Нет доступных объявлений.</p>
        )}
      </div>
    </div>
  );
};

export default AdsList;
