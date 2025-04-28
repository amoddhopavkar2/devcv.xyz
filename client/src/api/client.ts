import axios from 'axios';
import { API_CONFIG } from './config';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // This will be http://localhost:5001
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient; 