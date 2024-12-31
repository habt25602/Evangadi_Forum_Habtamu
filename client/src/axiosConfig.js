import axios from "axios";

// Create an Axios instance
const axiosBase = axios.create({
  // baseURL: "http://localhost:3306/api",
  baseURL: "https://evangadi-forum-habtamu-2024.onrender.com/api",
});

// Add a request interceptor
axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosBase;
