import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdmin,
  clearMessage,
  clearError,
} from "../../redux/slices/updateSlice/updateSlice";
import Popup from "reactjs-popup";

const UpdateEmailPage = () => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.update);

  const handleUpdate = async () => {
    if (!newEmail || !confirmNewEmail) {
      setPopupMessage("Both fields are required");
      setTimeout(() => setPopupMessage(null), 3000);
      return;
    }
    if (newEmail !== confirmNewEmail) {
      setPopupMessage("Emails do not match");
      setTimeout(() => setPopupMessage(null), 3000);
      return;
    }

    const handleCancel = () => {
      navigate("/profile");
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-highlight">
            Update Email
          </h1>
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
                {loading ? "Updating..." : "Update Email"}
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
          {popupMessage && (
            <Popup
              open={true}
              onClose={() => setPopupMessage(null)}
              closeOnDocumentClick
            >
              <div className="w-full text-center p-4 rounded-lg shadow-lg">
                {popupMessage}
              </div>
            </Popup>
          )}
          {error && (
            <Popup
              open={true}
              onClose={() => setPopupMessage(null)}
              closeOnDocumentClick
            >
              <div className="w-full text-center p-4 rounded-lg shadow-lg">
                {error}
              </div>
            </Popup>
          )}
        </div>
      </div>
    );
  };
};
export default UpdateEmail;
