import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/auth/authSlice";
import logo from "../images/logo.png";
import Modal from "../components/Modal/Modal"; // Adjust the import path as needed

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal when logout button is clicked
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  return (
    <div className="w-64 h-full bg-primary sidebar-gradient text-highlight fixed flex flex-col justify-between">
      <div className="py-6 px-3">
        <div className="flex mb-10">
          <img src={logo} alt="Logo" className="size-16" />
          <Link to="/dashboard" className="text-xl mt-1">Texinity Technologies</Link>
          
        </div>
        <ul className="ml-4 flex flex-col text-xl ">
          
          <li className="mb-4 hover:text-highlightHover">
            <Link to="/dashboard">Stores</Link>
          </li>
          <li className="mb-4 hover:text-highlightHover">
            <Link to="/dashboard/owner">Owners</Link>
          </li>
          <li className="mb-4 hover:text-highlightHover">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="mb-4 hover:text-highlightHover">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <div className="p-6 flex flex-row justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>

        <button
          onClick={handleLogout}
          className=" text-highlight hover:text-highlightHover "
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
