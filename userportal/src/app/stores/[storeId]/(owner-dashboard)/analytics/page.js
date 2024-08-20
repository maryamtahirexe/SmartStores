"use client";
import React from 'react';
import Card from '@/components/card/Card';
import WeeklyProfitsChart from '@/components/Charts/barGraph/barGraph';
import WeeklyOrdersAndProfitsChart from '@/components/Charts/composedGraph/composedGraph';
import StorePerformanceChart from '@/components/Charts/radialBarGraph/radialBarGraph';

const Analytics = () => {
  // Dummy data
  const dummyData = {
    activeStores: 5,
    activeOwners: 3,
    inventoryItems: 120,
    ordersReceived: 200,
    totalEarnings: 15000,
    weeklyProfits: [500, 700, 1200, 300, 900, 1500, 2000],
    radialBarData: [
      { name: 'Inventory', value: 85, fill: '#8884d8' },
      { name: 'Orders', value: 70, fill: '#83a6ed' },
      { name: 'Earnings', value: 50, fill: '#8dd1e1' },
      { name: 'Stores', value: 60, fill: '#82ca9d' },
      { name: 'Owners', value: 40, fill: '#a4de6c' },
    ],
    composedChartData: [
      { name: 'Week 1', orders: 400, profit: 240, earnings: 2400 },
      { name: 'Week 2', orders: 300, profit: 139, earnings: 2210 },
      { name: 'Week 3', orders: 200, profit: 980, earnings: 2290 },
      { name: 'Week 4', orders: 278, profit: 390, earnings: 2000 },
      { name: 'Week 5', orders: 189, profit: 480, earnings: 2181 },
      { name: 'Week 6', orders: 239, profit: 380, earnings: 2500 },
      { name: 'Week 7', orders: 349, profit: 430, earnings: 2100 },
    ],
  };

  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-3 gap-4">
            <Card title="Active Stores" value={dummyData.activeStores} />
            <Card title="Active Owners" value={dummyData.activeOwners} icon />
            <Card title="Inventory Items" value={dummyData.inventoryItems} icon />
            <Card title="Orders Received" value={dummyData.ordersReceived} icon />
            <Card title="Total Earnings" value={`$${dummyData.totalEarnings}`} icon />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Weekly Profits</h2>
            <WeeklyProfitsChart data={dummyData.weeklyProfits} />
          </div>
        </div>
      </div>
  
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">Weekly Orders and Profits</h2>
          <WeeklyOrdersAndProfitsChart data={dummyData.composedChartData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">Store Performance</h2>
          <StorePerformanceChart data={dummyData.radialBarData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
