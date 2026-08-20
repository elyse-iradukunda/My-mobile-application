import axios from 'axios';
import { ACCESS_TOKEN_KEY, getItem } from '@/utils/storage';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string | string[] } | undefined)?.message;
    if (Array.isArray(message)) {
      return message.join(', ');
    }
    if (message) {
      return message;
    }
    if (!error.response) {
      return `Cannot reach the server at ${API_URL}`;
    }
  }
  return fallback;
}
