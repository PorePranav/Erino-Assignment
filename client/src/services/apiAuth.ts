import { User } from '../types';
import api from './api';

export async function getCurrentUser() {
  try {
    const { data } = await api.get('/auth/me', { withCredentials: true });
    return data.data as User;
  } catch (error) {
    throw error;
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { data } = await api.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }
    );
    return data.data as User;
  } catch (error) {
    throw error;
  }
}

export async function signup({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const { data } = await api.post(
      '/auth/signup',
      { name, email, password, confirmPassword },
      { withCredentials: true }
    );
    return data.data as User;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const { data } = await api.get('/auth/logout', { withCredentials: true });
    return { status: data.status };
  } catch (error) {
    throw error;
  }
}
