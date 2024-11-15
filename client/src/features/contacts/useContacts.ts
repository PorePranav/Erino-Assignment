import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../services/apiContacts';

export function useContacts() {
  const { isLoading, data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return { isLoading, contacts };
}
