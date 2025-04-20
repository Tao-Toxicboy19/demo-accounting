import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from '../store/features/auth-slice';
import { JSX } from 'react';

export default function PublicRoute(): JSX.Element {
  const user = useSelector(authSelector).user;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
