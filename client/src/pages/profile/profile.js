import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdate = () => {
    // Handle the update logic here
  };

  const handleNavigateToUpdateEmail = () => {
    navigate('./updateEmail');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-full max-w-md bg-primary p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-highlight">Profile</h2>
      <form>
        <div className="mb-4 flex items-center">
          <label className="block text-highlight mb-2 w-full" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
          />
          <button
            type="button"
            onClick={handleNavigateToUpdateEmail}
            className="ml-4 text-highlight hover:text-highlight transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-highlight mb-2" htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
          />
        </div>
        <div className="mb-6">
          <label className="block text-highlight mb-2" htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default ProfilePage;