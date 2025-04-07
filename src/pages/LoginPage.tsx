import Button from '../components/Button';
import Google from '../assets/google.svg';
import Icons from '../components/Icons';
import { JSX } from 'react';
import { signInWithGoogle } from '../services/singInWithGoogle';

export default function LoginPage(): JSX.Element {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        startIcon={<Icons path={Google} className="size-5" />}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
