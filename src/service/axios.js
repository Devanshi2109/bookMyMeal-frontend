import axios from "axios";

const SPRING_BASE_URL = "http://localhost:8080/api";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: SPRING_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
