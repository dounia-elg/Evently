import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPublishedEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const getAllEventsAdmin = async () => {
  const response = await api.get('/events/all');
  return response.data;
};

export const updateEventStatus = async (id: string, status: string) => {
  const response = await api.patch(`/events/${id}/status`, { status });
  return response.data;
};

export const createEvent = async (data: any) => {
  const response = await api.post('/events', data);
  return response.data;
};
