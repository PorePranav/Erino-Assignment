import { Contact } from '../types';
import api from './api';

export async function getContacts() {
  try {
    const { data } = await api.get('/contacts', { withCredentials: true });
    return data.data as Contact[];
  } catch (error) {
    throw error;
  }
}

export async function createContact({
  firstName,
  lastName,
  email,
  phoneNumber,
  company,
  jobTitle,
}: Contact) {
  try {
    const { data } = await api.post(
      '/contacts',
      { firstName, lastName, email, phoneNumber, company, jobTitle },
      { withCredentials: true }
    );
    return data.data as Contact;
  } catch (error) {
    throw error;
  }
}

export async function updateContact(_id: string, contact: Contact) {
  try {
    const { data } = await api.put(`/contacts/${_id}`, contact, {
      withCredentials: true,
    });
    return data.data as Contact;
  } catch (error) {
    throw error;
  }
}

export async function deleteContact(_id: string) {
  try {
    await api.delete(`/contacts/${_id}`, { withCredentials: true });
  } catch (error) {
    throw error;
  }
}
