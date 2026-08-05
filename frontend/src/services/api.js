import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// Handle unauthorized access

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default API;
