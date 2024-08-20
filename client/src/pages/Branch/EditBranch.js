// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import InputField from "../../components/inputField/inputField";
// import Button from "../../components/Button/button";
// import { useNavigate, useLocation } from "react-router-dom";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import Select from 'react-select'; // Import react-select
// import { updateBranch, fetchStoresWithOwners } from "../../redux/slices/adminSlice/adminSlice";

// const EditBranch = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//   });
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [popupType, setPopupType] = useState(null);
//   const [selectedStores, setSelectedStores] = useState([]);

//   const editBranch = location.state?.branch;
//   const storeId = location.state?.storeId;

//   const stores = useSelector((state) => state.admin.stores);

//   useEffect(() => {
//     dispatch(fetchStoresWithOwners()); // Fetch stores when the component mounts
//   }, [dispatch]);

//   useEffect(() => {
//     if (editBranch) {
//       setFormData({ name: editBranch.name, location: editBranch.location });
//       // Set selected stores for editing the branch
//       setSelectedStores(editBranch.stores.map(store => ({ value: store._id, label: store.name })));
//     }
//   }, [editBranch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleStoreChange = (selectedOptions) => {
//     setSelectedStores(selectedOptions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const storeIds = selectedStores.map(store => store.value);
//       await dispatch(updateBranch({ id: editBranch._id, storeId, ...formData, storeIds })).unwrap();
//       setPopupMessage("Branch updated successfully");
//       setPopupType('success');
//       setTimeout(() => {
//         navigate("/dashboard", {
//           state: { updatedBranchId: editBranch._id, storeId },
//         });
//       }, 4000);
//     } catch (error) {
//       setPopupMessage("Failed to update branch");
//       setPopupType('error');
//     }
//   };

//   const closePopup = () => {
//     setPopupMessage(null);
//     if (popupType === 'success') {
//       navigate(`/dashboard`);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">Edit Branch</h1>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Branch Name"
//             name="name"
//             id="name"
//             placeholder="Enter branch name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Location"
//             name="location"
//             id="location"
//             placeholder="Enter branch location"
//             value={formData.location}
//             onChange={handleChange}
//           />
//           <div className="my-4">
//             <label className="block text-sm font-medium text-highlight">Select Stores</label>
//             <Select
//               isMulti
//               options={stores.map(store => ({ value: store.id, label: store.storeName }))}
//               onChange={handleStoreChange}
//               value={selectedStores}
//               styles={{
//                 control: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: "#191343",
//                   border: "1px solid #317879",
//                   boxShadow: "none",
//                   color: "#fff",
//                   ":hover": {
//                     borderColor: "#f5c145",
//                   },
//                   boxShadow: state.isFocused ? "0 0 0 1px #f5c145" : "none",
//                 }),
//                 multiValue: (provided) => ({
//                   ...provided,
//                   backgroundColor: "#f5c145",
//                 }),
//                 multiValueLabel: (provided) => ({
//                   ...provided,
//                   color: "#fff",
//                 }),
//                 multiValueRemove: (provided) => ({
//                   ...provided,
//                   color: "#fff",
//                   ':hover': {
//                     backgroundColor: "#f5c145",
//                     color: "#fff",
//                   },
//                 }),
//                 option: (baseStyles, state) => ({
//                   ...baseStyles,
//                   backgroundColor: state.isSelected
//                     ? "#efc55f"
//                     : state.isFocused
//                     ? "#f5c145"
//                     : null,
//                   color: state.isSelected ? "#fff" : "#000",
//                   ":active": {
//                     backgroundColor: "#f5c145",
//                   },
//                 }),
//               }}
//               classNamePrefix="custom-multiselect"
//             />
//           </div>
//           <div className="flex my-4 gap-x-4">
//             <Button text="Update Branch" />
//             <Button text="Close" onClick={() => navigate(`/dashboard/store/${storeId}/branches`)} />
//           </div>
//         </form>
//         {popupMessage && (
//           <Popup open={true} onClose={closePopup} closeOnDocumentClick>
//             <div className="w-full p-6 text-center">
//               <p className="text-primary mb-4">{popupMessage}</p>
//               <Button text="OK" onClick={closePopup} />
//             </div>
//           </Popup>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditBranch;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';
import { updateBranch, fetchStoresWithOwners, fetchBranchById } from "../../redux/slices/adminSlice/adminSlice";

const EditBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);

  const editBranch = location.state?.branch;
  const storeId = location.state?.storeId;

  const stores = useSelector((state) => state.admin.stores);
  const branch = useSelector((state) => state.admin.branch); // Add this line to get branch data from state

  useEffect(() => {
    dispatch(fetchBranchById()); // Fetch stores when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (branch) {
      setFormData({ name: branch.name, location: branch.location, storeId: branch.store });
      setSelectedStores(branch.stores.map(store => ({ value: store._id, label: store.name })));
    }
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStoreChange = (selectedOptions) => {
    setSelectedStores(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storeIds = selectedStores.map(store => store.value);
      await dispatch(updateBranch({ id: branch._id, storeId, ...formData, storeIds })).unwrap();
      setPopupMessage("Branch updated successfully");
      setPopupType('success');
      setTimeout(() => {
        navigate("/dashboard", {
          state: { updatedBranchId: branch._id, storeId },
        });
      }, 4000);
    } catch (error) {
      setPopupMessage("Failed to update branch");
      setPopupType('error');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
    if (popupType === 'success') {
      navigate(`/dashboard`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
        <h1 className="text-3xl text-highlight mb-6 text-center">Edit Branch</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Branch Name"
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
          <div className="my-4">
            <label className="block text-sm font-medium text-highlight">Select Stores</label>
            <Select
              isMulti
              options={stores.map(store => ({ value: store.id, label: store.storeName }))}
              onChange={handleStoreChange}
              value={selectedStores}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#191343",
                  border: "1px solid #317879",
                  boxShadow: "none",
                  color: "#fff",
                  ":hover": {
                    borderColor: "#f5c145",
                  },
                  boxShadow: state.isFocused ? "0 0 0 1px #f5c145" : "none",
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#f5c145",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: "#fff",
                  ':hover': {
                    backgroundColor: "#f5c145",
                    color: "#fff",
                  },
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? "#efc55f"
                    : state.isFocused
                    ? "#f5c145"
                    : null,
                  color: state.isSelected ? "#fff" : "#000",
                  ":active": {
                    backgroundColor: "#f5c145",
                  },
                }),
              }}
              classNamePrefix="custom-multiselect"
            />
          </div>
          <div className="flex my-4 gap-x-4">
            <Button text="Update Branch" />
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

export default EditBranch;

