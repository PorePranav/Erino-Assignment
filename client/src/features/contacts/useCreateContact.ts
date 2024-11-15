import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createContact as createContactApi } from '../../services/apiContacts';
import { Contact } from '../../types';

export function useCreateContact() {
  const queryClient = useQueryClient();
  const { mutate: createContact, status } = useMutation({
    mutationFn: (data: Contact) => createContactApi(data),
    onSuccess: (contact: Contact) => {
      toast.success('Contact saved successfully');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || 'An error occurred');
    },
  });

  return { createContact, isLoading: status === 'pending' };
}
