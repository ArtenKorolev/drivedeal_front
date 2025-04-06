import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/authService";
import apiClient from "../../apiClient"; // Import apiClient for fetching ads
import "./Profile.css";

const Profile = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [userAds, setUserAds] = useState([]); // State for user ads
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await AuthService.fetchProfile();
                setProfileData(data);
                fetchUserAds(data.username); // Fetch ads after fetching profile
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

        const fetchUserAds = async (username) => {
            try {
                const response = await apiClient.get(`/ads/by-username`, {
                    params: { username },
                });
                setUserAds(response.data.data); // Set user ads
            } catch (err) {
                console.error("Ошибка при загрузке объявлений:", err);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleDeleteAd = async (adId) => {
        try {
            await apiClient.delete(`/ads/delete`, {
                params: { ident: adId },
            });
            setUserAds((prevAds) => prevAds.filter((ad) => ad.id !== adId)); // Remove the deleted ad from the state
        } catch (err) {
            console.error("Ошибка при удалении объявления:", err);
        }
    };

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
            <div className="profile-card">
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

            <div className="ads-section">
                <h2 className="ads-header">Мои объявления</h2>
                <div className="ads-grid">
                    {userAds.length > 0 ? (
                        userAds.map((ad) => (
                            <div key={ad.id} className="ad-card">
                                <img
                                    src={ad.car?.image_url || "https://via.placeholder.com/150"}
                                    alt={ad.car?.name || "Без названия"}
                                    className="ad-image"
                                />
                                <h3 className="ad-title">{ad.car?.name || "Без названия"}</h3>
                                <p className="ad-description">{ad.car?.description || "Описание отсутствует"}</p>
                                <div className="ad-actions">
                                    <Link to={`/ads/${ad.id}`} className="ad-button">
                                        Перейти
                                    </Link>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteAd(ad.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-ads-message">У вас пока нет объявлений.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;