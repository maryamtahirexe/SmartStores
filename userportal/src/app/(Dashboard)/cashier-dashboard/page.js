"use client";
import React, { useState } from 'react';

const CashierPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for the table
  const customers = [
    { srNo: 1, name: 'John Doe', moneyPaid: '$100', taxApplied: '$10' },
    { srNo: 2, name: 'Jane Smith', moneyPaid: '$150', taxApplied: '$15' },
    { srNo: 3, name: 'Duaa', moneyPaid: '$150', taxApplied: '$10' },
    { srNo: 4, name: 'Maryam Smith', moneyPaid: '$150', taxApplied: '$25' },
    { srNo: 5, name: 'Rohma Rani Smith', moneyPaid: '$150', taxApplied: '$175' },
    { srNo: 6, name: 'Abdullah Smith', moneyPaid: '$150', taxApplied: '$18' },
    // Add more customers as needed
  ];

  return (
    <div className="min-h-screen p-8 bg-primary">
      <div className="max-w-4xl mx-auto">
        {/* Search Functionality */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-300 w-full p-2 rounded outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-bold text-gray-700">Total Sales</h3>
            <p className="text-3xl text-highlight font-semibold">$10,000</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-bold text-gray-700">Total Transactions</h3>
            <p className="text-3xl text-highlight font-semibold">200</p>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white p-6 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-3 text-highlight">Sr. No</th>
                <th className="pb-3 text-highlight">Customer Name</th>
                <th className="pb-3 text-highlight">Money Paid</th>
                <th className="pb-3 text-highlight">Tax Applied</th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter(customer =>
                  customer.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((customer, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{customer.srNo}</td>
                    <td className="py-2">{customer.name}</td>
                    <td className="py-2">{customer.moneyPaid}</td>
                    <td className="py-2">{customer.taxApplied}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashierPage;
