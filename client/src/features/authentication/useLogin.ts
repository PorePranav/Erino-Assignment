import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, status } = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApi(data),
    onSuccess: (user: User) => {
      queryClient.setQueryData(['user'], user);
      navigate('/contacts');
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || 'An error occurred');
    },
  });

  return { login, isLoading: status === 'pending' };
}
