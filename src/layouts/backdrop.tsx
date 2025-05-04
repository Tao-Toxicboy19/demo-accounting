import { JSX } from 'react';
import { useSelector } from 'react-redux';
import {
  sidebarSelector,
  toggleMobileSidebar,
  useAppDispatch,
} from '../services/store';

export default function Backdrop(): JSX.Element | null {
  const sidebarReducer = useSelector(sidebarSelector);
  const dispatch = useAppDispatch();

  if (!sidebarReducer.isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={() => dispatch(toggleMobileSidebar())}
    />
  );
}
