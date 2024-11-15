import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, status } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.resetQueries();
      navigate('/login', { replace: true });
      toast.success('You have been logged out');
    },
  });

  return { logout, isLoading: status === 'pending' };
}
