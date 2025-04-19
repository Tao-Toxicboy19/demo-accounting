import { JSX } from 'react';
import { useNavigate } from 'react-router';
import Google from '../assets/google.svg';
import Button from '../components/Button';
import Icons from '../components/Icons';
import { signInWithGoogle } from '../services/sing-in-with-google';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const handleLogin = async (): Promise<void> => {
    const res = await signInWithGoogle();
    if (res) {
      navigate('/');
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
