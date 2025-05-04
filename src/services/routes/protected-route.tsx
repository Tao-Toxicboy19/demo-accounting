import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';
import HydrateFallback from '../../pages/hydrate-fallback';
import { useCurrentUser } from '../hooks/use-auth';

export default function RrotectedRoute(): JSX.Element {
  const { isPending, data } = useCurrentUser();

  if (isPending) {
    return <HydrateFallback />;
  }

  if (!data) {
    return <Navigate to="/authentication/login" replace />;
  }

  return <Outlet />;
}
