"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '@/components/inputField/page';
import { addProduct } from '@/redux/slices/ownerSlice/ownerSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    originalPrice: '',
    afterTaxPrice: '',
    category: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(productData)); 
  };

  return (
    <div className="p-6 bg-primary">
      <h1 className="text-2xl text-highlight font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Product Name"
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Original Price"
          type="number"
          name="originalPrice"
          value={productData.originalPrice}
          onChange={handleChange}
          required
        />

        <InputField
          label="After Tax Price"
          type="number"
          name="afterTaxPrice"
          value={productData.afterTaxPrice}
          onChange={handleChange}
          required
        />

        <InputField
          label="Category"
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
        />

        <InputField
          label="Quantity"
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
