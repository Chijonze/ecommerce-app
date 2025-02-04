import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const loginUser = (email, password) =>
  API.post('/users/login', { email, password });

export const registerUser = (name, email, password) =>
  API.post('/users/register', { name, email, password });
