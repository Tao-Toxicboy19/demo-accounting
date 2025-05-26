import clsx from 'clsx';
import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { sidebarSelector } from '../services/store';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Backdrop from './backdrop';

export default function ContentLayout(): JSX.Element {
  const sidebarReducer = useSelector(sidebarSelector);

  return (
    <main className="xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={clsx(
          'flex-1 transition-all duration-300 ease-in-out',
          sidebarReducer.isMobileOpen
            ? 'ml-0'
            : sidebarReducer.isExpanded || sidebarReducer.isHovered
              ? 'lg:ml-[290px]'
              : 'lg:ml-[90px]',
        )}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-full min-h-[calc(100vh-200px)] h-full md:p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
