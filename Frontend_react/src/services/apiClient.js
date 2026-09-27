// src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://works-export-respiratory-oakland.trycloudflare.com", // 👈 replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired or invalid tokens (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
