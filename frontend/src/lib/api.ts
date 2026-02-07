import axios from 'axios';

// Replace this with your actual backend URL if it's different
const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Helper function to fetch published events
export const getPublishedEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};
