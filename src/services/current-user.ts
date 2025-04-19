import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

export async function currentUser(): Promise<User | null> {
  return await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}
