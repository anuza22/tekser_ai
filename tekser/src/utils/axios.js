// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aisun-production.up.railway.app', // your server URL
});

export default instance;
