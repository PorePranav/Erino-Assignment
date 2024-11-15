import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../../services/apiAuth.js';
import { User } from '../../types';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, status } = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => signupApi(data),
    onSuccess: (user: User) => {
      queryClient.setQueryData(['user'], user);
      navigate('/contacts');
      toast.success('Account created successfully');
    },
    onError: (err) => {
      toast.error((err as any).response?.data?.message || 'An error occurred');
    },
  });

  return { signup, isLoading: status === 'pending' };
}
