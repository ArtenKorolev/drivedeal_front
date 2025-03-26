import apiClient from "../apiClient";

class AuthService {
    static async login(username, password) {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            // Send FormData in the request body
            const response = await apiClient.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the correct content type
                },
            });

            const { access_token, refresh_token } = response.data;
            localStorage.setItem("authToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            localStorage.setItem("username", username);
            return username;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    static async register(username, password, phoneNumber) {
        try {
            const response = await apiClient.post("/auth/register", {
                username,
                password,
                phone_number: phoneNumber,
            });
            return response.data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    static async fetchProfile() {
        try {
            const response = await apiClient.get("/auth/my-account");
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            throw error;
        }
    }

    static async refreshAccessToken() {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token отсутствует. Пожалуйста, войдите в систему.");
        }

        try {
            // Append the refresh token directly to the URL as a query parameter
            const response = await apiClient.post(`/auth/refresh-token?refresh_token=${refreshToken}`);
            const { access_token } = response.data;
            localStorage.setItem("authToken", access_token);
            return access_token;
        } catch (error) {
            console.error("Ошибка обновления токена:", error.message);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
    }
}

export default AuthService;