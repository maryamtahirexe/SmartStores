import React from "react";

const OwnerDashboard = () => {
  return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Owner Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Analytics</h2>
            <p className="text-gray-600">View detailed analytics of your business performance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Sales</h2>
            <p className="text-gray-600">Monitor and manage your sales data.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Inventory</h2>
            <p className="text-gray-600">Keep track of your stock and inventory levels.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Cashier</h2>
            <p className="text-gray-600">Manage cashier operations efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Profile</h2>
            <p className="text-gray-600">Update your profile and manage account settings.</p>
          </div>
        </div>
      </div>
  );
};

export default OwnerDashboard;
