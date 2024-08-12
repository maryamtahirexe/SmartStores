import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOwner, updateOwner } from "../../redux/slices/ownerSlice/ownerSlice";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AddOwner = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null); 
  const editOwner = location.state?.owner;

  useEffect(() => {
    if (editOwner) {
      setFormData({ name: editOwner.name, email: editOwner.email, password: "" });
    }
  }, [editOwner]);

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
      if (editOwner) {
        await dispatch(updateOwner({ id: editOwner._id, ...formData })).unwrap();
        setPopupMessage("Owner updated successfully");
        setPopupType('success');
      } else {
        await dispatch(createOwner(formData)).unwrap();
        setPopupMessage("Owner created successfully");
        setPopupType('success');
      }
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setPopupMessage("Failed to save owner or Owner already existed");
      setPopupType('error');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === 'success') {
      navigate("/dashboard/owner");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">
          {editOwner ? "Edit Owner" : "Add Owner"}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            id="name"
            placeholder="Enter owner's name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            id="email"
            placeholder="Enter owner's email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            id="password"
            placeholder="Enter owner's password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex my-4 gap-x-4">
          <Button text={editOwner ? "Update Owner" : "Create Owner"} />
          <Button text="Close" onClick= {() => navigate("/dashboard")}/>
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

export default AddOwner;

