import { JSX, useEffect, useState } from 'react';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router';
import { path } from '../services/routes/route-path';
import Button from './button';
import { logout } from '../services/sing-out';
import HydrateFallback from '../pages/hydrate-fallback';
import { useCurrentUser } from '../services/hooks/use-auth';
import { useQueryClient } from '@tanstack/react-query';

type HeaderConfig = {
  title: string;
  showBack: boolean;
  toPaht: string;
};

export default function Header(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();
  const { data, isPending } = useCurrentUser();
  const queryClient = useQueryClient();
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    title: 'New',
    showBack: false,
    toPaht: path.transaction.new,
  });
  const handleLogout = async (): Promise<void> => {
    const res = await logout();
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    if (res) navigate(path.auth.login);
  };

  useEffect(() => {
    if (pathname.startsWith('/new')) {
      setHeaderConfig({
        title: 'Back',
        showBack: true,
        toPaht: path.root,
      });
    } else {
      setHeaderConfig({
        title: 'New',
        showBack: false,
        toPaht: path.transaction.new,
      });
    }
  }, [pathname]);

  if (isPending) return <HydrateFallback />;

  return (
    <div className="container mx-auto mt-3">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-sm text-gray-600">{data?.displayName}</p>
          </div>
          <Button
            className="h-10 ml-5"
            component={Link}
            to={headerConfig.toPaht}
          >
            {headerConfig.title}
          </Button>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
