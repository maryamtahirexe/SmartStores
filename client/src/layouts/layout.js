import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <main className="col-span-5 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

