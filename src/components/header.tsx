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
    <div className="container mx-auto mt-3">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-sm text-gray-600">{data?.displayName}</p>
          </div>
          <Button className="h-10 ml-3" component={Link} to={path.root}>
            Back
          </Button>
          <Button
            className="h-10 ml-3"
            component={Link}
            to={path.transaction.new}
          >
            Transaction
          </Button>
          <Button
            className="h-10 ml-3"
            component={Link}
            to={path.installment.new}
          >
            Installment
          </Button>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
