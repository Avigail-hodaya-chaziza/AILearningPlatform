import axios from 'axios';

// Backend base URL from .env, fallback to the dev HTTP port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5215/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // enable cookies
});

// Align request behavior with api.ts so either file behaves the same
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    const token = localStorage.getItem('token');

    try {
      console.log('=== REQUEST DEBUG ===');
      console.log('Request URL:', config?.url);
      console.log('Admin Token:', adminToken ? `exists (${adminToken.substring(0, 20)}...)` : 'missing');
      console.log('User Token:', token ? `exists (${token.substring(0, 20)}...)` : 'missing');
      console.log('All localStorage keys:', Object.keys(localStorage));
    } catch (_) {}

    if (config.url && config.url.includes('Admin')) {
      // Don't attach Authorization for the login endpoint
      if (config.url.includes('/Admin/login')) {
        console.log('ℹ️ Skipping Authorization header for /Admin/login');
        return config;
      }
      if (adminToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${adminToken}`;
        console.log('✅ Using admin token for admin endpoint');
      } else {
        console.log('❌ No admin token found for admin endpoint!');
      }
    } else if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Using user token for regular endpoint');
    }

    try {
      console.log('Final Authorization header:', config.headers?.Authorization ? 'SET' : 'NOT SET');
      console.log('Authorization header value:', config.headers?.Authorization);
      console.log('===================');
    } catch (_) {}

    return config;
  },
  (error) => {
    console.error('[api.js] Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);