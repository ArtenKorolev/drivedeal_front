import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdsList.css'

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ads/all');
        setAds(response.data.data);
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
      <h1>Объявления</h1>
      <div className="ads-wrapper">
        {ads.length > 0 ? (
          ads.map(ad => (
            <div key={ad.id} className="ad">
              <h3 className="ad-header">{ad.car.name}</h3>
              <p>{ad.car.model.name}</p>
              <p>Объем двигателя: {ad.car.volume}</p>
              <p><strong>Цена:</strong> {ad.car.price}₽</p>
              <p>Владелец: {ad.user.name}</p>
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
