import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthUser } from '../hooks/use-auth-user';

export default function ProtectedRoute(): JSX.Element {
  const { uid } = useAuthUser();

  if (uid == '') {
    return <Navigate to="/authentication/login" replace />;
  }

  return <Outlet />;
}
