import axios from "axios";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token отсутствует. Пожалуйста, войдите в систему.");
    }

    try {
        // Append the refresh token directly to the URL as a query parameter
        const response = await axios.post(`http://localhost:8000/auth/refresh-token?refresh_token=${refreshToken}`);

        const { access_token } = response.data;

        // Update the access token in localStorage
        localStorage.setItem("authToken", access_token);

        return access_token;
    } catch (error) {
        console.error("Ошибка обновления токена:", error.message);
        throw error;
    }
};