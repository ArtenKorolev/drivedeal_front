import axios from "axios";
import { refreshAccessToken } from "./authUtils"; // Import the refresh utility

const apiClient = axios.create({
    baseURL: "http://192.168.0.111:8000", // Base URL for your API
    withCredentials: true, // Include cookies in requests if needed
});

// Add a request interceptor to attach the access token
apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Interceptor triggered for error:", error.response?.status);

        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Attempting to refresh token...");
                const newToken = await refreshAccessToken(); // Refresh the access token
                console.log("New access token received:", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error("Ошибка при обновлении токена:", refreshError.message);
                // Clear tokens and redirect to login if refresh fails
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "#/login"; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;