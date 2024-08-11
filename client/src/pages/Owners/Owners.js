import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwners, deleteOwner } from "../../redux/slices/ownerSlice/ownerSlice";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Owner = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { owners, loading, error } = useSelector((state) => state.owners);
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState(null);
  const [ownerToDelete, setOwnerToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

  const handleEdit = (owner) => {
    navigate("/dashboard/manage-owner", { state: { owner } });
  };

  const handleDelete = (id) => {
    setOwnerToDelete(id);
    setPopupMessage("Are you sure you want to delete this owner?");
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteOwner(ownerToDelete)).unwrap();
      setPopupMessage("Owner deleted successfully");
    } catch (error) {
      setPopupMessage("Failed to delete owner.");
    }
    setOwnerToDelete(null);
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (!ownerToDelete) {
      dispatch(fetchOwners()); // Refresh the owner list if an owner was deleted
    }
  };
const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 m-2">
      <div className="flex mb-6">
        <div className="flex bg-slate-300 items-center rounded-lg p-3 w-4/5">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-300 ml-2 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="text-primary font-bold bg-slate-300 rounded-lg p-3 ml-3 w-1/5"
          onClick={() => navigate("/dashboard/manage-owner")}
        >
          Add Owner
        </button>
      </div>
      <h1 className="text-3xl mb-4 font-bold text-primary">Owners</h1>
      <ul className="w-full divide-y divide-primary">
        {filteredOwners.length === 0 ? (
          <li className="p-4 text-center">No owners found.</li>
        ) : (
          filteredOwners.map((owner) => (
            <li
              key={owner._id}
              className="flex justify-between items-center p-4 mb-2 rounded"
            >
              <span>{owner.name}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(owner)} aria-label="Edit">
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
                <button onClick={() => handleDelete(owner._id)} aria-label="Delete">
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
            </li>
          ))
        )}
      </ul>
      {popupMessage && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick={false}>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="text-lg">{popupMessage}</p>
            {ownerToDelete ? (
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg mr-2"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  onClick={() => {
                    setPopupMessage(null);
                    setOwnerToDelete(null);
                  }}
                >
                  No
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-primary hover:bg-highlight text-white rounded-lg"
                onClick={closePopup}
              >
                Close
              </button>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Owner;

