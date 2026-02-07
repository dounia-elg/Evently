import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Helper function to fetch published events
export const getPublishedEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};
