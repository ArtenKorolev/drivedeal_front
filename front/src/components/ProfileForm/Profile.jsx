import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import "./Profile.css";

const Profile = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await AuthService.fetchProfile();
                setProfileData(data);
            } catch (err) {
                console.error("Ошибка при загрузке профиля:", err);
                if (err.response && err.response.status === 401) {
                    AuthService.logout();
                    navigate("/login");
                } else {
                    setError("Не удалось загрузить данные профиля.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <p className="loading-message">Загрузка профиля...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const handleLogout = () => {
        AuthService.logout();
        onLogout(); // Call the logout function passed from App.js
        navigate("/");
    };

    return (
        <div className="profile-container">
            <img
                className="profile-image"
                src="https://ds4-sosnovoborsk-r04.gosweb.gosuslugi.ru/netcat_files/21/10/blankdirectory_3.png"
                alt="фото профиля"
            />

            <h1 className="profile-header">Профиль</h1>
            <div className="profile-item">
                <strong>Имя пользователя:</strong> {profileData.username}
            </div>
            <div className="profile-item">
                <strong>Номер телефона:</strong> {profileData.phone_number}
            </div>
            <div className="profile-item">
                <strong>Активен:</strong> {profileData.is_active ? "Да" : "Нет"}
            </div>

            <button className="logout-button" onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
};

export default Profile;