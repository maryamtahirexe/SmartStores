import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/auth/authSlice';
import './sidebar.css';
import Modal from '../components/Modal/Modal'; // Adjust the import path as needed

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal when logout button is clicked
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  return (
    <div className="w-64 h-full sidebar-gradient text-white fixed flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Texinity Technologies</h1>
        <ul>
          <li className="mb-4">
            <Link to="/" className="flex items-center text-white hover:text-purple-300">
              Inventory
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/stores" className="flex items-center text-white hover:text-purple-300">
              Stores
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/owners" className="flex items-center text-white hover:text-purple-300">
              Owners
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="flex items-center text-white hover:text-purple-300">
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="flex items-center text-white hover:text-purple-300">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:text-purple-300 w-full"
        >
          Logout
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default Sidebar;
