import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';

export const signInWithGoogle: () => Promise<UserCredential | null> =
  async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      return res;
    } catch (err) {
      console.error('Google sign-in failed:', err);
      return null;
    }
  };
