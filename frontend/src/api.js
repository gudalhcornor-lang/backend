import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const imgUrl = (path) => `http://127.0.0.1:8000/storage/${path}`;

export default api;
