import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact as deleteContactApi } from '../../services/apiContacts';
import toast from 'react-hot-toast';

export function useDeleteContact() {
  const queryClient = useQueryClient();

  const { mutate: deleteContact, status } = useMutation({
    mutationFn: (_id: string) => deleteContactApi(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully');
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || 'An error occurred');
    },
  });

  return { deleteContact, isDeleting: status === 'pending' };
}
