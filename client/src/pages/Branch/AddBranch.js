import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBranch, updateBranch } from "../../redux/slices/branchSlice/branchSlice";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AddBranch = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const editBranch = location.state?.branch;
  const storeId = location.state?.storeId;

  useEffect(() => {
    if (editBranch) {
      setFormData({ name: editBranch.name, location: editBranch.location });
    }
  }, [editBranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editBranch) {
        await dispatch(updateBranch({ id: editBranch._id, storeId, ...formData })).unwrap();
        setPopupMessage("Branch updated successfully");
        setPopupType('success');
      } else {
        await dispatch(createBranch({ storeId, ...formData })).unwrap();
        setPopupMessage("Branch created successfully");
        setPopupType('success');
      }
      setFormData({ name: "", location: "" });
    } catch (error) {
      setPopupMessage("Failed to save branch");
      setPopupType('error');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === 'success') {
      navigate(`/dashboard/store/${storeId}/branches`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editBranch ? "Edit Branch" : "Add Branch"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            id="name"
            placeholder="Enter branch name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Location"
            name="location"
            id="location"
            placeholder="Enter branch location"
            value={formData.location}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
            <Button text={editBranch ? "Update Branch" : "Create Branch"} />
            <Button text="Close" onClick={() => navigate(`/dashboard/store/${storeId}/branches`)} />
          </div>
        </form>
        {popupMessage && (
          <Popup open={true} onClose={closePopup} closeOnDocumentClick>
            <div className="w-full p-6 text-center">
              <p className="text-primary mb-4">{popupMessage}</p>
              <Button text="OK" onClick={closePopup} />
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default AddBranch;
