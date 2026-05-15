// api/client.ts
import axios from 'axios';
import { API_CONFIG } from './constants';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include the value parameter
apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    value: API_CONFIG.API_VALUE,
  };
  return config;
});