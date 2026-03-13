import axios from 'axios';

//create an instance of axios with default configuration
const api = axios.create({
  baseURL: 'https://localhost:7048/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
    (config) => {
        
        //check if we have a saved Token in the browser's memory
        const token = localStorage.getItem('token');
        
        //if we have a token, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;