import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the token to every request if the user is logged in
api.interceptors.request.use((config) => {
  try {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved?.token) {
      config.headers.Authorization = `Bearer ${saved.token}`;
    }
  } catch {
    // ignore broken saved data
  }
  return config;
});

// Turn a backend error into a readable message
export const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

export default api;