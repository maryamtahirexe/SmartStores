import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createInventory, updateInventory } from '../../redux/slices/inventorySlice/inventorySlice';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/Button/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const InventoryForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const editInventory = location.state?.inventory;

  useEffect(() => {
    if (editInventory) {
      setFormData({
        name: editInventory.name,
        quantity: editInventory.quantity,
        description: editInventory.description,
      });
    }
  }, [editInventory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editInventory) {
        await dispatch(updateInventory({ id: editInventory._id, ...formData })).unwrap();
        setPopupMessage('Inventory updated successfully');
        setPopupType('success');
      } else {
        await dispatch(createInventory(formData)).unwrap();
        setPopupMessage('Inventory created successfully');
        setPopupType('success');
      }
      setFormData({ name: '', quantity: '', description: '' });
    } catch (error) {
      setPopupMessage('Failed to save inventory');
      setPopupType('error');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === 'success') {
      navigate('/dashboard/inventory');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editInventory ? 'Edit Inventory' : 'Add Inventory'}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            id="name"
            placeholder="Enter inventory name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Quantity"
            name="quantity"
            id="quantity"
            placeholder="Enter inventory quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <InputField
            label="Description"
            name="description"
            id="description"
            placeholder="Enter inventory description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
            <Button text={editInventory ? 'Update Inventory' : 'Create Inventory'} />
            <Button text="Close" onClick={() => navigate('/dashboard')} />
          </div>
        </form>
        {popupMessage && (
          <Popup open={true} onClose={closePopup} closeOnDocumentClick>
            <div className="w-full p-6 text-center">
              <p className="text-primary mb-4">{popupMessage}</p>
              <Button text="OK" onClick={closePopup} />
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default InventoryForm;
