import axios from "axios";

export const baseUrl = 'http://127.0.0.1:8000/api/';

const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
})
