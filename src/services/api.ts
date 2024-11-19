import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const registerUser = (data: any) => api.post('/register', data);
export const loginUser = (data: any) => api.post('/login', data);
