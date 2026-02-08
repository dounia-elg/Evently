import axios from 'axios';
import { Event, Reservation, User } from '@/types';

type AuthResponse = { user: User; access_token: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

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

export const getPublishedEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const registerUser = async (data: Record<string, string>): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: Record<string, string>): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const getAllEventsAdmin = async (): Promise<Event[]> => {
  const response = await api.get('/events/all');
  return response.data;
};

export const updateEventStatus = async (id: string, status: string): Promise<Event> => {
  const response = await api.patch(`/events/${id}/status`, { status });
  return response.data;
};

export const createEvent = async (data: Record<string, unknown>): Promise<Event> => {
  const response = await api.post('/events', data);
  return response.data;
};

export const getAllReservationsAdmin = async (): Promise<Reservation[]> => {
  const response = await api.get('/reservations/all');
  return response.data;
};

export const updateReservationStatus = async (id: string, status: string): Promise<Reservation> => {
  const response = await api.patch(`/reservations/${id}/status`, { status });
  return response.data;
};

export const getMyReservations = async (): Promise<Reservation[]> => {
  const response = await api.get('/reservations/me');
  return response.data;
};

export const downloadTicket = async (reservationId: string): Promise<Blob> => {
  const response = await api.get(`/tickets/${reservationId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

export const cancelReservation = async (id: string): Promise<Reservation> => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};

export const createReservation = async (eventId: string): Promise<Reservation> => {
  const response = await api.post('/reservations', { eventId });
  return response.data;
};
