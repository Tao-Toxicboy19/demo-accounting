import { JSX } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router';
import { path } from '../services/routes/route-path';
import Button from './button';
import { logout } from '../services/sing-out';
import HydrateFallback from '../pages/hydrate-fallback';
import { useCurrentUser } from '../services/hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function Header(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const { data, isPending } = useCurrentUser();
  const queryClient = useQueryClient();
  const handleLogout = async (): Promise<void> => {
    const res = await logout();
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    if (res) navigate(path.auth.login);
  };

  if (isPending) return <HydrateFallback />;

  return (
    <div className="bg-orange-200">
      <div className="container mx-auto flex items-center justify-between min-h-[64px]">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-sm text-gray-600">{data?.displayName}</p>
          </div>
          <nav className="flex items-center space-x-3 text-sm font-medium ml-3">
            <Link to={path.root}>Transaction</Link>
            <Link to={path.installment.list}>Installment</Link>
          </nav>
        </div>
        <Button onClick={handleLogout} className="h-10">
          Logout
        </Button>
      </div>
    </div>
  );
}
