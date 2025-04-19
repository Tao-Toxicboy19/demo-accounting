import { JSX } from 'react';
import { logout } from '../services/sing-out';
import { auth } from '../firebase';
import { NavigateFunction, useNavigate } from 'react-router';

export default function TransactionPage(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = async (): Promise<void> => {
    const res: boolean = await logout();
    if (res) {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>hello world</h1>
      <h1>{auth.currentUser?.displayName}</h1>
      <button onClick={handleLogin}>Logout</button>
    </div>
  );
}
