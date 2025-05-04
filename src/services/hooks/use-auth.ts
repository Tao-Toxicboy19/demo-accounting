import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { User } from '../types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export const useCurrentUser = (): UseQueryResult<User | null, Error> => {
  return useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          resolve(user);
        });
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
