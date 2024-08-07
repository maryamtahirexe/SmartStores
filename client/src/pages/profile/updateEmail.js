import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputField/inputField";

const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add logic to handle email update
    console.log("Update Email:", newEmail);
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("../profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-highlight">Update Email</h1>
        <form onSubmit={handleUpdate}>
          <InputField
            label="Enter New Email"
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <InputField
            label="Confirm New Email"
            type="email"
            id="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-highlight text-black px-4 py-2 rounded-lg hover:bg-highlight-600 transition-colors duration-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;