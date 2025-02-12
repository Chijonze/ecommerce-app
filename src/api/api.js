import axios from 'axios';

const API = axios.create({ baseURL: 'https://ecommerce-app-delta-vert.vercel.app/' });

export const loginUser = (email, password) =>
  API.post('/users/login', { email, password });

export const registerUser = (name, email, password) =>
  API.post('/users/register', { name, email, password });
