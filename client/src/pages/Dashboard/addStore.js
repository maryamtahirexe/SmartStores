import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Button/button";
import InputField from "../../components/inputField/inputField";
import {
  fetchOwners,
  addStore,
  fetchStoresWithOwners,
} from "../../redux/slices/adminSlice/adminSlice";

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owners: [],
  });

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
      owners: selectedList.map((owner) => owner.key), // Use owner's ID
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addStore(formData)).unwrap();
      navigate("/dashboard"); // Redirect or perform other actions on success
    } catch (error) {
      console.error("Failed to add store:", error);
    }
  };

  // Format owners for Multiselect
  const formattedOwners = owners.map((owner) => ({
    key: owner._id, // Use the owner's ID as the key
    name: owner.name, // Display value
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
              displayValue="name" // Display the owner's name
              onKeyPressFn={function noRefCheck() {}}
              onRemove={function noRefCheck() {}}
              onSearch={function noRefCheck() {}}
              onSelect={handleSelectChange}
              options={formattedOwners}
              avoidHighlightFirstOption={true}
              className="custom-multiselect"
              style={{
                chips: { background: "#efc55f" },
                searchBox: { border: "1px solid #317879" },
                option: { color: "#191343" },
              }}
            />
          </div>
          <div className="mt-6">
            <Button
              text="Add Store"
              type="submit"
              bgColor="#efc55f"
              textColor="#191343"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStore;
