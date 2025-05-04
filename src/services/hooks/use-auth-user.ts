import { useQuery } from '@tanstack/react-query';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';

type MinimalUser = {
  pictures: string;
  uid: string;
  displayName: string | null;
};

const fetchCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export const useAuthUser = (): MinimalUser => {
  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });

  return {
    pictures: data?.photoURL || '',
    uid: data?.uid || '',
    displayName: data?.displayName || '',
  };
};
