import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';

export const signInWithGoogle = async (): Promise<UserCredential | unknown> => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    return res;
  } catch (err: unknown) {
    return err;
  }
};
