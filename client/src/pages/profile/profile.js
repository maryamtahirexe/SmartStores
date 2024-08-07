import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/inputField";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-purple-900">Profile</h1>
        <div className="mb-4 flex items-center">
          <InputField
            label="Email"
            type="email"
            value="admin@example.com" 
            readOnly
            className="flex-grow"
          />
          <button
            onClick={() => handleNavigate("/updateEmail")}
            aria-label="Change Email"
            className="ml-4 text-primary hover:text-highlight transition-colors duration-300"
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4 flex items-center relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value="password123" // Replace with actual password
            readOnly
            className="flex-grow"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Show/Hide Password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => handleNavigate("/profile/updatePassword")}
            aria-label="Change Password"
            className="ml-4 text-primary hover:text-highlight transition-colors duration-300"
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
