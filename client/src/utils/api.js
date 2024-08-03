import axios from 'axios';
import Cookies from 'js-cookie';

export const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const login = ({ email, password }) =>  API.post('/auth/login', { email, password });
export const fetchOwner = () => API.get('/owner');
export const fetchStores = () => API.get('/stores/with-owners');
export const deleteStores = (storeId) => API.delete(`/stores/${storeId}`);

API.interceptors.request.use((config) => {
  const token = Cookies.get('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


