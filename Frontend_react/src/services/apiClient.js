// src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://kingston-firewire-feels-floor.trycloudflare.com", // 👈 replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors for auth tokens, logging, etc.
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default apiClient;
