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

API.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


