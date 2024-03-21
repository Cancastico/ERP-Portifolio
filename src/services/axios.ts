import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';
const CONTENT_TYPE = 'application/json';

export const AxiosNode = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': CONTENT_TYPE,
  },
});

AxiosNode.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});