import axios from 'axios';
import Cookies from 'js-cookie';

export const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints for Inventory
export const loginOwnerAPI = ({ email, password}) => API.post('/owner/login', { email, password });
export const addProductAPI = (productData) => API.post('/inventory', productData);
export const fetchStoreAPI = () => API.get('/stores');

API.interceptors.request.use((config) => {
  const token = Cookies.get('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
