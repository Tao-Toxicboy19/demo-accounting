// import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { JSX } from 'react';
import { Outlet } from 'react-router';
import AppSidebar from './app-sidebar';
import { useSelector } from 'react-redux';
import { sidebarSelector } from '../services/store';
import AppHeader from './app-header';
import Backdrop from './backdrop';

function LayoutContent() {
  const sidebarReducer = useSelector(sidebarSelector);

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarReducer.isExpanded || sidebarReducer.isHovered
            ? 'lg:ml-[290px]'
            : 'lg:ml-[90px]'
        } ${sidebarReducer.isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function AppLayout(): JSX.Element {
  return (
    // <SidebarProvider>
    <LayoutContent />
    // </SidebarProvider>
  );
}
