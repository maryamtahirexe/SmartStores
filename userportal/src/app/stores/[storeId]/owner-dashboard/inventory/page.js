"use client"; 

import Button from '@/components/Button/page';
import Searchbar from '@/components/Searchbar/Searchbar';
import React from 'react';
import { useRouter } from 'next/navigation';

const Inventory = () => {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push('/add-product'); // Adjust the path as needed
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Searchbar placeholder="Search for products..." />
        <Button text="Add Product" onClick={handleAddProduct} />
      </div>
      <div className="flex flex-col space-y-4">
        {/* This is where you would map over product data and display it */}
        <div className="flex justify-between p-4 border border-gray-300 rounded-lg">
          <span>Product Name</span>
          <span>$ Price</span>
          <span>Category</span>
        </div>
        {/* Repeat for each product */}
      </div>
    </div>
  );
}

export default Inventory;
