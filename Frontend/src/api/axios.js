import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://your-backend-url.onrender.com/api",
  withCredentials: true,
});

export default API;
