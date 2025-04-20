import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAppDispatch } from '../store/store';
import { setUser } from '../store/features/auth-slice';
import { User } from '../types/users-type';

export function useAuth(): void {
  const dispatch = useAppDispatch();
  const previousUidRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        if (previousUidRef.current !== uid) {
          const simplifiedUser: User = { uid, email, displayName, photoURL };
          dispatch(setUser(simplifiedUser));
          previousUidRef.current = uid;
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}
