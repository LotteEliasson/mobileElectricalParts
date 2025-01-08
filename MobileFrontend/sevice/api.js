
//Axois instance that include the JWT token in the Authorization header.

import axios from "axios";
import * as SecureStore from 'expo-secure-store';

//wifi:
const API_URL = 'http://192.168.1.83:5000/api';
//Mobil:
//const API_URL = 'http://192.168.106.194:5000/api';
//Azure:
//const API_URL = 'https://electricparts-h8a0e7cec9d8fjb3.northeurope-01.azurewebsites.net/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        console.log('Token retrieved:', token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Fejl ved hentning af token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
  
  export default api;

