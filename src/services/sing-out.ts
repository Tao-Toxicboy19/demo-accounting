import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const logout = async (): Promise<boolean> => {
  await signOut(auth);
  return true;
};
