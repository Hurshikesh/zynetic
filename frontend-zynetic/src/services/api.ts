// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data: any) => API.post('/auth/signup', data);
export const login = (data: any) => API.post('/auth/login', data);
export const createProduct = (data: any) => API.post('/products', data);
export const getProducts = (filters = {}) => API.get('/products', { params: filters });
export const deleteProduct = (id: string) => {
  return axios.delete(`/api/products/${id}`);
};



export default API;

