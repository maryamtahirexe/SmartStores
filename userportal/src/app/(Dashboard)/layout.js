// app/dashboard/layout.js
import React from 'react';
import Sidebar from '@/components/sidebar/SideBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <main className="col-span-5 ml-6">
        {children}
      </main>
    </div>
  );
}
