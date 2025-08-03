import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const setupTokenExpirationInterceptor = (logoutUser) => {
    api.interceptors.response.use(response => response,
        error => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                logoutUser();
            }
            return Promise.reject(error);
        });
}

export default api;

