"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "@/components/Button/page";
import { logout } from "@/redux/slices/userSlice/userSlice";

const Sidebar = ({ storeId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => setIsModalOpen(true);

  const confirmLogout = () => {
    dispatch(logout());
    router.push("/");
    setIsModalOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-64 h-full bg-primary sidebar-gradient text-highlight fixed flex flex-col justify-between">
      <div className="py-6 px-3">
        <div className="flex mb-10 items-center">
          <Image src={logo} alt="Logo" className="size-16" />
          <Link href="/ownerDashboard" passHref>
            <span className="text-xl mt-1">Texinity Technologies</span>
          </Link>
        </div>
        <ul className="ml-4 flex flex-col text-xl">
          {["Analytics", "Sales", "Inventory", "Cashier", "Profile"].map((item) => (
            <li key={item} className="mb-4 hover:text-highlightHover">
              <Link href={`${item.toLowerCase()}`} passHref>
                <span>{item}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 flex flex-row justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
          aria-label="Logout Icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>
        <button
          onClick={handleLogout}
          className="text-highlight hover:text-highlightHover ml-2"
          aria-label="Logout Button"
        >
          Logout
        </button>
      </div>
      {isModalOpen && (
        <Popup open={true} closeOnDocumentClick onClose={closeModal} modal>
          <div className="w-full p-6 text-center rounded-lg shadow-lg text-white">
            <p className="text-primary mb-4">
              Are you sure you want to logout? You will be redirected to the home page.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                text="Yes, Logout"
                onClick={confirmLogout}
                className="bg-green-500 hover:bg-green-600"
              />
              <Button
                text="Cancel"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600"
              />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Sidebar;
