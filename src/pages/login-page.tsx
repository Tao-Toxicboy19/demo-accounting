import { JSX } from 'react';
import { useNavigate } from 'react-router';
import Google from '../assets/google.svg';
import { signInWithGoogle } from '../services/sing-in-with-google';
import Icons from '../components/icons';
import { path } from '../services/routes/route-path';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../components/button';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogin = async (): Promise<void> => {
    const res = await signInWithGoogle();
    if (res) {
      const { uid, email, displayName, photoURL } = res.user;

      queryClient.setQueryData(['currentUser'], {
        uid,
        email,
        displayName,
        photoURL,
      });
      navigate(path.root);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        startIcon={<Icons path={Google} className="size-5" />}
        onClick={handleLogin}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
