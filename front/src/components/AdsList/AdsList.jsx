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
    fetchAds();
  }, []);

  if (loading) return <p>Загрузка объявлений...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="ads-wrapper">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="ad">
              <img
                className="car-image"
                src={ad.car.image_url}
                alt={ad.car.image_url}
              />
              <div className="car-info">
                <p>
                  {ad.car.model.name} {ad.car.name} {ad.car.transmission}
                </p>
                <p>{ad.car.mileage} км</p>
                <p>{ad.car.body}</p>
                <p>{ad.car.drive}</p>
                <p>
                  {ad.car.volume} л.куб ({ad.car.power} л.с)
                </p>
                <p className="car-price">{ad.car.price} ₽</p>
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
