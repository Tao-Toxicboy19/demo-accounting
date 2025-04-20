import { useSelector } from 'react-redux';
import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';
import { authSelector } from '../store/features/auth-slice';

export default function RrotectedRoute(): JSX.Element {
  const userReducer = useSelector(authSelector);

  if (!userReducer.user) {
    return <Navigate to="/authentication/login" replace />;
  }

  return <Outlet />;
}
