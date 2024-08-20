// pages/profile.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin, clearMessage, clearError } from '../redux/slices/updateSlice/updateSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { API } from '../utils/api';
import Button from '../components/Button/button'; // Assuming you have a Button component similar to the Owners page

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.update);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await API.get('/auth/admin');
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching email:', error);
        setPopupMessage('Failed to load email');
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (message) {
      setPopupMessage(message);
      dispatch(clearMessage());
    }
    if (error) {
      setPopupMessage(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  const handleUpdate = () => {
    if (!oldPassword || !newPassword) {
      setPopupMessage('Both password fields are required');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmUpdate = async () => {
    try {
      const response = await dispatch(updateAdmin({ email, oldPassword, password: newPassword })).unwrap();

      if (response.status === 'success') {
        setPopupMessage('Profile updated successfully');
        setTimeout(() => {
          setPopupMessage(null);
        }, 3000);
      } else {
        setPopupMessage(response.message || 'Failed to update profile');
      }

      setShowConfirmation(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setPopupMessage(error.message || 'Failed to update profile');
    }
  };

  const handleNavigateToUpdateEmail = () => {
    router.push('/updateEmail');
  };

  return (
    <div className="p-6 m-2">
      <h1 className="text-3xl mb-4 font-bold text-primary text-center">Profile</h1>
      <div className="mb-4">
        <label className="block text-primary mb-2" htmlFor="email">Email</label>
        <div
          id="email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary bg-gray-100"
        >
          {email || 'Loading...'}
        </div>
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
        <label className="block text-primary mb-2" htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-primary mb-2" htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-center space-x-7 mt-3">
        <Button
          text={loading ? 'Updating...' : 'Update'}
          onClick={handleUpdate}
          disabled={loading}
          className="px-6 py-3"
        />
        <Button
          text="Cancel"
          onClick={() => router.back()}
          variant="secondary"
          className="px-6 py-2"
        />
      </div>

      {popupMessage && (
        <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            {popupMessage}
            <Button text="OK" onClick={() => setPopupMessage(null)} />
          </div>
        </Popup>
      )}

      {showConfirmation && (
        <Popup open={true} onClose={() => setShowConfirmation(false)} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>Are you sure you want to change your password?</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="Confirm" onClick={confirmUpdate} />
              <Button text="Cancel" onClick={() => setShowConfirmation(false)} />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProfilePage;
