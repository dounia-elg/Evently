import axios from 'axios';


const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getPublishedEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};
