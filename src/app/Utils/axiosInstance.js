// utils/axiosInstance.js

import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 1000, // Optional: set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent, e.g., add authentication token
    const token = localStorage.getItem('token'); // Replace with your token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.log('Unauthorized access - maybe redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
