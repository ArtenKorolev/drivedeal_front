import { useState } from "react";
import axios from "axios";
import "./CreateAd.css";

const AdForm = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [power, setPower] = useState("");
  const [diskRadius, setDiskRadius] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [driveType, setDriveType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [volume, setVolume] = useState("");
  const [color, setColor] = useState("");
  const [image_url, setImageUrl] = useState(""); // новое состояние для ссылки на фото
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const apiUrl = "http://localhost:8000/ads/create";

    try {
      const newAd = {
        name,
        model,
        price: parseInt(price, 10),
        mileage: parseInt(mileage, 10),
        body_type: bodyType,
        power: parseInt(power, 10),
        disk_radius: parseInt(diskRadius, 10),
        transmission_type: transmissionType,
        drive_type: driveType,
        engine_type: engineType,
        volume: parseFloat(volume),
        color,
        image_url: image_url, // добавлено поле для ссылки на фото
      };

      const params = new URLSearchParams(newAd).toString(); // Преобразуем объект в строку параметров
      await axios.post(`${apiUrl}?${params}`); // Добавляем строку параметров к URL

      setSuccessMessage("Объявление о машине создано успешно!");
      // Сбрасываем поля формы
      setName("");
      setModel("");
      setPrice("");
      setMileage("");
      setBodyType("");
      setPower("");
      setDiskRadius("");
      setTransmissionType("");
      setDriveType("");
      setEngineType("");
      setVolume("");
      setColor("");
      setImageUrl(""); // сбрасываем поле для ссылки на фото

      // Вызов функции для обновления списка объявлений
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data
          ? err.detail || "Что-то пошло не так"
          : "Ошибка при создании объявления о машине";

      setError(`Ошибка: ${errorMessage}. URL: ${apiUrl}`);
    }
  };

  return (
    <form className="create-ad-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
        required
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Модель"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Цена"
        required
      />
      <input
        type="number"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
        placeholder="Пробег"
        required
      />
      <input
        type="text"
        value={bodyType}
        onChange={(e) => setBodyType(e.target.value)}
        placeholder="Тип кузова"
        required
      />
      <input
        type="number"
        value={power}
        onChange={(e) => setPower(e.target.value)}
        placeholder="Мощность"
        required
      />
      <input
        type="number"
        value={diskRadius}
        onChange={(e) => setDiskRadius(e.target.value)}
        placeholder="Диаметр диска"
        required
      />
      <input
        type="text"
        value={transmissionType}
        onChange={(e) => setTransmissionType(e.target.value)}
        placeholder="Тип трансмиссии"
        required
      />
      <input
        type="text"
        value={driveType}
        onChange={(e) => setDriveType(e.target.value)}
        placeholder="Тип привода"
        required
      />
      <input
        type="text"
        value={engineType}
        onChange={(e) => setEngineType(e.target.value)}
        placeholder="Тип двигателя"
        required
      />
      <input
        type="number"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        placeholder="Объем двигателя"
        required
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Цвет"
        required
      />
      <input
        type="text"
        value={image_url}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Ссылка на фото"
        required
      />
      <button type="submit">Создать объявление</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default AdForm;
