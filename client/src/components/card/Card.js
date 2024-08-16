import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteStore } from "../../redux/slices/adminSlice/adminSlice";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "../Button/button";

const Card = ({ storeId, storeName, storeLocation, owners,  branches, inventories, }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDelete = () => {
    setPopupMessage("Are you sure you want to delete this store?");
    setConfirmationPopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (storeId) {
        await dispatch(deleteStore(storeId.toString())).unwrap();
        setPopupMessage("Store deleted successfully");
        setShowSuccessPopup(true);
        
      } else {
        console.error("Store ID is undefined");
        setPopupMessage("Failed to delete Store. Please try again.");
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error("Failed to delete store:", error);
      setPopupMessage("Failed to delete Store. Please try again.");
      setShowSuccessPopup(true);
    } finally {
      setConfirmationPopup(false);
    }
  };

  const closePopup = () => {
    setConfirmationPopup(false);
    setShowSuccessPopup(false);
    setPopupMessage("");
  };
  return (
    <div className="bg-transparent shadow-2xl rounded-lg p-6 hover:shadow-primary transition-shadow duration-300 border border-primary">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">{storeName}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/dashboard/edit-store/${storeId}`)}
            aria-label="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button onClick={handleDelete} aria-label="Delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-accent text-base mb-4">Location: {storeLocation}</p>
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-primary">Owners:</h3>
        {owners.length === 0 ? (
          <p className="text-accent">None</p>
        ) : (
        <ul className="text-accent list-none">
          {owners.map((owner) => (
            <li key={owner.id} className="mb-1 text-base">
              <p>
                {owner.name} (
                <a
                  href={`mailto:${owner.email}`}
                  className="text-accent hover:text-primary transition-colors duration-300"
                >
                  {owner.email}
                </a>
                )
              </p>
            </li>
          ))}
        </ul>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-primary">Branches:</h3>
        {branches.length === 0 ? (
          <p className="text-accent">None</p>
        ) : (
          <ul className="text-accent list-none">
            {branches.map((branch) => (
              <li key={branch.id} className="mb-1 text-base">
                <p>
                  {branch.name} - {branch.location}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-primary">Inventories:</h3>
        {inventories.length === 0 ? (
          <p className="text-accent">None</p>
        ) : (
          <ul className="text-accent list-none">
            {inventories.map((inventory) => (
              <li key={inventory.id} className="mb-1 text-base">
                <p>
                  {inventory.name} - Quantity: {inventory.quantity}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {confirmationPopup && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="Yes" onClick={confirmDelete} />
              <Button text="No" onClick={closePopup} />
            </div>
          </div>
        </Popup>
      )}

      {showSuccessPopup && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="OK" onClick={closePopup} />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Card;
