import axios from 'axios';

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_URL || '',
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getClient = () => {
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    // localStorage.removeItem('token');
    const tokenValue = localStorage.getItem('token');
    config.headers.Authorization = tokenValue ? `Token ${tokenValue}` : '';
    return config;
  });
  return instance;
};

export default getClient();
