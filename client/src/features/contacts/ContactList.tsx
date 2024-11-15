import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Contact } from '../../types';
import ContactFormModal from './ContactFormModal';
import { useContacts } from './useContacts';
import { useCreateContact } from './useCreateContact';
import { useUpdateContact } from './useUpdateContact';
import { useDeleteContact } from './useDeleteContact';

const ContactList: React.FC = () => {
  const { isLoading, contacts } = useContacts();
  const { createContact } = useCreateContact();
  const { updateContact } = useUpdateContact();
  const { deleteContact } = useDeleteContact();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleOpenModal = (contact?: Contact) => {
    setSelectedContact(contact || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleContactSubmit = (contact: Contact) => {
    if (selectedContact) {
      updateContact({ _id: contact._id, newContactData: contact });
    } else {
      createContact(contact);
    }
    handleCloseModal();
  };

  const handleDeleteContact = (id: string) => {
    deleteContact(id);
  };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleOpenModal(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteContact(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add Contact
        </Button>
      </Box>
      <DataGrid
        rows={contacts}
        columns={columns}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        getRowId={(row) => row._id}
      />
      <ContactFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        contact={selectedContact || undefined}
        onSubmit={handleContactSubmit}
      />
    </Paper>
  );
};

export default ContactList;
