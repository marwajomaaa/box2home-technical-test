// src/api.ts
import axios from 'axios';

// Configure the base URL to point to your back-end server
const api = axios.create({
  baseURL: 'http://localhost:4200/api', // Adjust this URL to match your back-end server's URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if you need to add tokens, etc.
api.interceptors.request.use(
  (config) => {
    // For example, attach a token from local storage if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
