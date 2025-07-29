import React from 'react';
import { Outlet } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: 'leave',
          autoHideDelay: 800,
          theme: 'os-theme-dark'
        },
        overflow: {
          x: 'hidden',
          y: 'scroll'
        }
      }}
      className="h-screen"
    >
      <div className="min-h-screen bg-dark-bg text-gray-200">
        <Navigation />
        <main className="pb-32 lg:pb-8 lg:pl-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </OverlayScrollbarsComponent>
  );
};

export default Layout;