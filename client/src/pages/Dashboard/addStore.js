import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Button/button";
import InputField from "../../components/inputField/inputField";
import {
  fetchOwners,
  addStore,
} from "../../redux/slices/adminSlice/adminSlice";
import { RingLoader } from "react-spinners";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owners: [],
  });

  const [popupMessage, setPopupMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const owners = useSelector((state) => state.admin.owners);
  const ownersStatus = useSelector((state) => state.admin.ownersStatus);
  const ownersError = useSelector((state) => state.admin.ownersError);
  const addStoreStatus = useSelector((state) => state.admin.addStoreStatus);
  const addStoreError = useSelector((state) => state.admin.addStoreError);

  useEffect(() => {
    if (ownersStatus === "idle") {
      dispatch(fetchOwners());
    }
  }, [ownersStatus, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (selectedList) => {
    setFormData({
      ...formData,
      owners: selectedList.map((owner) => owner.key),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addStore(formData)).unwrap();
      setPopupMessage("Store created successfully!");
    } catch (error) {
      console.error("Failed to add store:", error);
      setPopupMessage("Failed to create store.");
    }
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
    navigate("/dashboard");
  };

  if (ownersStatus === "loading" || addStoreStatus === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader size={60} color="#191343" loading={true} />
      </div>
    );
  }

  if (ownersStatus === "failed") {
    return <div>Error: {ownersError}</div>;
  }

  const formattedOwners = owners.map((owner) => ({
    key: owner._id,
    name: owner.name,
  }));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">Add Store</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            id="name"
            placeholder="Enter store name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Location"
            type="text"
            id="location"
            placeholder="Enter store location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <div className="mt-4">
            <label
              htmlFor="owners"
              className="block text-sm font-medium text-highlight"
            >
              Owner
            </label>
            <Multiselect
              displayValue="name"
              onKeyPressFn={function noRefCheck() {}}
              onRemove={handleSelectChange}
              onSelect={handleSelectChange}
              options={formattedOwners}
            />
          </div>
          <Button text="Submit" className="mt-4" />
          <Button text="Close" onClick= {() => navigate("/dashboard")}/>
        </form>
        {addStoreStatus === "failed" && (
          <p className="text-red-600 mt-4">{addStoreError}</p>
        )}
      </div>
      {popupMessage && (
        <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
          <div className="popup-content">
            <p>{popupMessage}</p>
    
            <Button text="OK" onClick={handlePopupClose} />
            
            
          </div>
        </Popup>
      )}
    </div>
  );
};

export default AddStore;
{/* <button
type="button"
onClick={() => navigate("/dashboard")}
className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
>
&times;
</button> */}