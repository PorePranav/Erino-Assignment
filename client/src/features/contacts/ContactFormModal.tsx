import React, { FormEvent, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Contact } from '../../types';

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
  contact?: Contact;
  onSubmit: (contact: Contact) => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  open,
  onClose,
  contact,
  onSubmit,
}) => {
  const initialFormData: Omit<Contact, '_id'> = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  };

  const [formData, setFormData] =
    useState<Omit<Contact, '_id'>>(initialFormData);

  const resetForm = () => {
    setFormData(
      contact
        ? {
            firstName: contact.firstName || '',
            lastName: contact.lastName || '',
            email: contact.email || '',
            phoneNumber: contact.phoneNumber || '',
            company: contact.company || '',
            jobTitle: contact.jobTitle || '',
          }
        : initialFormData
    );
  };

  useEffect(() => {
    resetForm();
  }, [contact]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: contact?._id! });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [id]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{contact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              aria-label="First Name"
            />
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              aria-label="Last Name"
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
            />
            <TextField
              fullWidth
              id="phoneNumber"
              label="Phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              aria-label="Phone Number"
            />
            <TextField
              fullWidth
              id="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              aria-label="Company"
            />
            <TextField
              fullWidth
              id="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              aria-label="Job Title"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} aria-label="Cancel">
            Cancel
          </Button>
          <Button type="submit" variant="contained" aria-label="Submit">
            {contact ? 'Save Changes' : 'Add Contact'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactFormModal;
