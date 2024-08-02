import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-6">
        <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
