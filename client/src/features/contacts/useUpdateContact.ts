import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContact as updateContactApi } from '../../services/apiContacts';
import { toast } from 'react-hot-toast';
import { Contact } from '../../types';

export function useUpdateContact() {
  const queryClient = useQueryClient();

  const { mutate: updateContact, status } = useMutation({
    mutationFn: ({
      _id,
      newContactData,
    }: {
      _id: string;
      newContactData: Contact;
    }) => updateContactApi(_id, newContactData),
    onSuccess: () => {
      toast.success('Contact updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (err: Error) => {
      toast.error((err as any).response?.data?.message || 'An error occurred');
    },
  });

  return { updateContact, isUpdating: status === 'pending' };
}
