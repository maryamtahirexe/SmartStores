// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import {
//   fetchOwners,
//   addStore,
// } from "../../redux/slices/adminSlice/adminSlice";
// import { RingLoader } from "react-spinners";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const AddStore = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     owners: [],

//   });

//   const [popupMessage, setPopupMessage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const owners = useSelector((state) => state.admin.owners);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const ownersError = useSelector((state) => state.admin.ownersError);
//   const addStoreStatus = useSelector((state) => state.admin.addStoreStatus);
//   const addStoreError = useSelector((state) => state.admin.addStoreError);

//   useEffect(() => {
//     if (ownersStatus === "idle") {
//       dispatch(fetchOwners());
//     }
//   }, [ownersStatus, dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSelectChange = (selectedList) => {
//     setFormData({
//       ...formData,
//       owners: selectedList.map((owner) => owner.key),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(addStore(formData)).unwrap();
//       setPopupMessage("Store created successfully!");
//     } catch (error) {
//       console.error("Failed to add store:", error);
//       setPopupMessage(
//         "Some Error Occured while creating the store. Please try again."
//       );
//     }
//   };

//   const handlePopupClose = () => {
//     setPopupMessage(null);
//     navigate("/dashboard");
//   };

//   if (ownersStatus === "loading" || addStoreStatus === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <RingLoader size={60} color="#191343" loading={true} />
//       </div>
//     );
//   }

//   const formattedOwners = owners.map((owner) => ({
//     key: owner._id,
//     name: owner.name,
//   }));

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">Add Store</h1>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             type="text"
//             id="name"
//             placeholder="Enter store name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <InputField
//             label="Location"
//             type="text"
//             id="location"
//             placeholder="Enter store location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//           <div className="mt-4">
//             <label
//               htmlFor="owners"
//               className="block text-sm font-medium text-highlight"
//             >
//               Owner
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleSelectChange}
//               onSelect={handleSelectChange}
//               options={formattedOwners}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//           </div>
//           <div className="flex my-4 gap-x-4">
//             <Button text="Add Store" />
//             <Button text="Close" onClick={() => navigate("/dashboard")} />
//           </div>
//         </form>
//       </div>
//       {popupMessage && (
//         <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
//           <div className="w-full p-6 text-center">
//               <p className="text-primary mb-4">{popupMessage}</p>
//               <Button
//                 text="OK"
//                 onClick={handlePopupClose}
//               />
//             </div>
//         </Popup>
//       )}
//     </div>
//   );
// };

// export default AddStore;











///correct one
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import {
//   fetchOwners,
//   addStore,
//   fetchInventories,
//   fetchBranches,
// } from "../../redux/slices/adminSlice/adminSlice";
// import { RingLoader } from "react-spinners";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const AddStore = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     owners: [],
//     branches: [],
//     inventories: [],
//   });

//   const [selectedStoreId, setSelectedStoreId] = useState(null);
//   const [popupMessage, setPopupMessage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const owners = useSelector((state) => state.admin.owners);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const ownersError = useSelector((state) => state.admin.ownersError);
//   const addStoreStatus = useSelector((state) => state.admin.addStoreStatus);
//   const addStoreError = useSelector((state) => state.admin.addStoreError);

//   const inventories = useSelector((state) => state.admin.inventories);
//   const inventoriesStatus = useSelector(
//     (state) => state.admin.inventoriesStatus
//   );

//   const branches = useSelector((state) => state.admin.branches);
//   const branchesStatus = useSelector((state) => state.admin.branchesStatus);

//   useEffect(() => {
//     if (ownersStatus === "idle") {
//       dispatch(fetchOwners());
//     }
//   }, [ownersStatus, dispatch]);

//   useEffect(() => {
//     if (selectedStoreId) {
//       dispatch(fetchBranches());
//     }
//   }, [selectedStoreId, dispatch]);

//   useEffect(() => {
//     console.log("Inventory status:", inventoriesStatus);
//     if (inventoriesStatus === "idle") {
//       dispatch(fetchInventories());
//     }
//   }, [inventoriesStatus, dispatch]);

//   const formattedInventories = inventories.map((inventory) => ({
//     key: inventory._id,
//     name: inventory.name, // Adjust based on your inventory object structure
//   }));

//   const formattedBranches = (branches || []).map((branch) => ({
//     key: branch._id,
//     name: branch.name,
//   }));

//   const handleBranchChange = (selectedList) => {
//     setFormData({
//       ...formData,
//       branches: selectedList.map((branch) => branch.key),
//     });
//   };

//   const handleInventoryChange = (selectedList) => {
//     console.log("Selected Inventories:", selectedList);
//     setFormData({
//       ...formData,
//       inventories: selectedList.map((inventory) => inventory.key),
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSelectChange = (selectedList) => {
//     setFormData({
//       ...formData,
//       owners: selectedList.map((owner) => owner.key),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     try {
//       const response = await dispatch(addStore(formData)).unwrap();
//       console.log("API Response:", response);
//       setPopupMessage("Store created successfully!");
//     } catch (error) {
//       console.error("Failed to add store:", error);
//       setPopupMessage(
//         error?.message ||
//           "Some Error Occurred while creating the store. Please try again."
//       );
//     }
//   };

//   const handlePopupClose = () => {
//     setPopupMessage(null);
//     navigate("/dashboard");
//   };

//   if (
//     ownersStatus === "loading" ||
//     addStoreStatus === "loading" ||
//     branchesStatus === "loading" ||
//     inventoriesStatus === "loading"
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <RingLoader size={60} color="#191343" loading={true} />
//       </div>
//     );
//   }

//   const formattedOwners = owners.map((owner) => ({
//     key: owner._id,
//     name: owner.name,
//   }));

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">Add Store</h1>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             type="text"
//             id="name"
//             placeholder="Enter store name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <InputField
//             label="Location"
//             type="text"
//             id="location"
//             placeholder="Enter store location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//           <div className="mt-4 relative">
//             <label
//               htmlFor="branches"
//               className="block text-sm font-medium text-highlight"
//             >
//               Branches
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleBranchChange}
//               onSelect={handleBranchChange}
//               options={formattedBranches}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//   <button
//     className="absolute bottom-0 right-0 mt-1 mr-1 p-2 text-white bg-primary rounded-full hover:bg-highlight"
//     onClick={() => navigate("/dashboard/manage-branch")}
//   >
//     +
//   </button>
//           </div>
//           <div className="mt-4">
//             <label
//               htmlFor="owners"
//               className="block text-sm font-medium text-highlight"
//             >
//               Owner
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleSelectChange}
//               onSelect={handleSelectChange}
//               options={formattedOwners}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//           </div>
//           <div className="mt-4">
//             <label
//               htmlFor="inventories"
//               className="block text-sm font-medium text-highlight"
//             >
//               Inventories
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleInventoryChange}
//               onSelect={handleInventoryChange}
//               options={formattedInventories}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//           </div>
//           <div className="flex my-4 gap-x-4">
//             <Button text="Add Store" />
//             <Button text="Close" onClick={() => navigate("/dashboard")} />
//           </div>
//         </form>
//       </div>
//       {popupMessage && (
//         <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
//           <div className="w-full p-6 text-center">
//             <p className="text-primary mb-4">{popupMessage}</p>
//             <Button text="OK" onClick={handlePopupClose} />
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// };

// export default AddStore;
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import {
//   fetchOwners,
//   addStore,
//   fetchInventories,
//   fetchBranches,
// } from "../../redux/slices/adminSlice/adminSlice";
// import { RingLoader } from "react-spinners";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const AddStore = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     owners: [],
//     branches: [],
//     inventories: [],
//   });

//   const [selectedStoreId, setSelectedStoreId] = useState(null);
//   const [popupMessage, setPopupMessage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const owners = useSelector((state) => state.admin.owners);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const ownersError = useSelector((state) => state.admin.ownersError);
//   const addStoreStatus = useSelector((state) => state.admin.addStoreStatus);
//   const addStoreError = useSelector((state) => state.admin.addStoreError);

//   const inventories = useSelector((state) => state.admin.inventories);
//   const inventoriesStatus = useSelector(
//     (state) => state.admin.inventoriesStatus
//   );

//   const branches = useSelector((state) => state.admin.branches);
//   const branchesStatus = useSelector((state) => state.admin.branchesStatus);

//   useEffect(() => {
//     if (ownersStatus === "idle") {
//       dispatch(fetchOwners());
//     }
//   }, [ownersStatus, dispatch]);

//   useEffect(() => {
//     if (selectedStoreId) {
//       dispatch(fetchBranches());
//     }
//   }, [selectedStoreId, dispatch]);

//   useEffect(() => {
//     dispatch(fetchBranches());
//     dispatch(fetchInventories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (location.state?.newBranchId) {
//       const newBranch = branches.find(branch => branch._id === location.state.newBranchId);
//       if (newBranch) {
//         setFormData((prevData) => ({
//           ...prevData,
//           branches: [...prevData.branches, newBranch._id]
//         }));
//       }
//     }
//   }, [location.state, branches]);

//   useEffect(() => {
//     console.log("Inventory status:", inventoriesStatus);
//     if (inventoriesStatus === "idle") {
//       dispatch(fetchInventories());
//     }
//   }, [inventoriesStatus, dispatch]);

//   const formattedInventories = inventories.map((inventory) => ({
//     key: inventory._id,
//     name: inventory.name, // Adjust based on your inventory object structure
//   }));

//   const formattedBranches = (branches || []).map((branch) => ({
//     key: branch._id,
//     name: branch.name,
//   }));

//   const handleBranchChange = (selectedList) => {
//     setFormData({
//       ...formData,
//       branches: selectedList.map((branch) => branch.key),
//     });
//   };

//   const handleInventoryChange = (selectedList) => {
//     console.log("Selected Inventories:", selectedList);
//     setFormData({
//       ...formData,
//       inventories: selectedList.map((inventory) => inventory.key),
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSelectChange = (selectedList) => {
//     setFormData({
//       ...formData,
//       owners: selectedList.map((owner) => owner.key),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     try {
//       const response = await dispatch(addStore(formData)).unwrap();
//       console.log("API Response:", response);
//       setPopupMessage("Store created successfully!");
//     } catch (error) {
//       console.error("Failed to add store:", error);
//       setPopupMessage(
//         error?.message ||
//           "Some Error Occurred while creating the store. Please try again."
//       );
//     }
//   };

//   const handlePopupClose = () => {
//     setPopupMessage(null);
//     navigate("/dashboard");
//   };

//   if (
//     ownersStatus === "loading" ||
//     addStoreStatus === "loading" ||
//     branchesStatus === "loading" ||
//     inventoriesStatus === "loading"
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <RingLoader size={60} color="#191343" loading={true} />
//       </div>
//     );
//   }

//   const formattedOwners = owners.map((owner) => ({
//     key: owner._id,
//     name: owner.name,
//   }));

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">Add Store</h1>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             type="text"
//             id="name"
//             placeholder="Enter store name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <InputField
//             label="Location"
//             type="text"
//             id="location"
//             placeholder="Enter store location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//           <div className="mt-4 relative">
//             <label
//               htmlFor="branches"
//               className="block text-sm font-medium text-highlight"
//             >
//               Branches
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleBranchChange}
//               onSelect={handleBranchChange}
//               options={formattedBranches}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//   <button
//     className="absolute bottom-0 right-0 mt-1 mr-1 p-2 text-white bg-primary rounded-full hover:bg-highlight"
//     onClick={() => navigate("/dashboard/manage-branch")}
//   >
//     +
//   </button>
//           </div>
//           <div className="mt-4">
//             <label
//               htmlFor="owners"
//               className="block text-sm font-medium text-highlight"
//             >
//               Owner
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleSelectChange}
//               onSelect={handleSelectChange}
//               options={formattedOwners}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//           </div>
//           <div className="mt-4">
//             <label
//               htmlFor="inventories"
//               className="block text-sm font-medium text-highlight"
//             >
//               Inventories
//             </label>
//             <Multiselect
//               displayValue="name"
//               onKeyPressFn={function noRefCheck() {}}
//               onRemove={handleInventoryChange}
//               onSelect={handleInventoryChange}
//               options={formattedInventories}
//               className="custom-multiselect"
//               avoidHighlightFirstOption={true}
//               style={{
//                 chips: { background: "#efc55f" },
//                 searchBox: { border: "1px solid #317879" },
//               }}
//             />
//           </div>
//           <div className="flex my-4 gap-x-4">
//             <Button text="Add Store" />
//             <Button text="Close" onClick={() => navigate("/dashboard")} />
//           </div>
//         </form>
//       </div>
//       {popupMessage && (
//         <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
//           <div className="w-full p-6 text-center">
//             <p className="text-primary mb-4">{popupMessage}</p>
//             <Button text="OK" onClick={handlePopupClose} />
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// };

// export default AddStore;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Button/button";
import InputField from "../../components/inputField/inputField";
import {
  fetchOwners,
  addStore,
  fetchInventories,
  fetchBranches,
} from "../../redux/slices/adminSlice/adminSlice";
import { RingLoader } from "react-spinners";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owners: [],
    branches: [],
    inventories: [],
  });

  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const owners = useSelector((state) => state.admin.owners);
  const ownersStatus = useSelector((state) => state.admin.ownersStatus);
  const ownersError = useSelector((state) => state.admin.ownersError);
  const addStoreStatus = useSelector((state) => state.admin.addStoreStatus);
  const addStoreError = useSelector((state) => state.admin.addStoreError);

  const inventories = useSelector((state) => state.admin.inventories);
  const inventoriesStatus = useSelector(
    (state) => state.admin.inventoriesStatus
  );

  const branches = useSelector((state) => state.admin.branches);
  const branchesStatus = useSelector((state) => state.admin.branchesStatus);

  useEffect(() => {
    if (ownersStatus === "idle") {
      dispatch(fetchOwners());
    }
  }, [ownersStatus, dispatch]);

  useEffect(() => {
    if (selectedStoreId) {
      dispatch(fetchBranches());
    }
  }, [selectedStoreId, dispatch]);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchInventories());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.newBranchId) {
      const newBranch = branches.find(branch => branch._id === location.state.newBranchId);
      if (newBranch) {
        setFormData((prevData) => ({
          ...prevData,
          branches: [...prevData.branches, newBranch._id]
        }));
      }
    }
  }, [location.state, branches]);

  useEffect(() => {
    console.log("Inventory status:", inventoriesStatus);
    if (inventoriesStatus === "idle") {
      dispatch(fetchInventories());
    }
  }, [inventoriesStatus, dispatch]);

  const formattedInventories = inventories.map((inventory) => ({
    key: inventory._id,
    name: inventory.name, // Adjust based on your inventory object structure
  }));

  const formattedBranches = (branches || []).map((branch) => ({
    key: branch._id,
    name: branch.name,
  }));

  const handleBranchChange = (selectedList) => {
    setFormData({
      ...formData,
      branches: selectedList.map((branch) => branch.key),
    });
  };

  const handleInventoryChange = (selectedList) => {
    console.log("Selected Inventories:", selectedList);
    setFormData({
      ...formData,
      inventories: selectedList.map((inventory) => inventory.key),
    });
  };

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
    console.log("Form Data:", formData);
    try {
      const response = await dispatch(addStore(formData)).unwrap();
      console.log("API Response:", response);
      setPopupMessage("Store created successfully!");
    } catch (error) {
      console.error("Failed to add store:", error);
      setPopupMessage(
        error?.message ||
          "Some Error Occurred while creating the store. Please try again."
      );
    }
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
    navigate("/dashboard");
  };

  if (
    ownersStatus === "loading" ||
    addStoreStatus === "loading" ||
    branchesStatus === "loading" ||
    inventoriesStatus === "loading"
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader size={60} color="#191343" loading={true} />
      </div>
    );
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
              className="custom-multiselect"
              avoidHighlightFirstOption={true}
              style={{
                chips: { background: "#efc55f" },
                searchBox: { border: "1px solid #317879" },
              }}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="inventories"
              className="block text-sm font-medium text-highlight"
            >
              Inventories
            </label>
            <Multiselect
              displayValue="name"
              onKeyPressFn={function noRefCheck() {}}
              onRemove={handleInventoryChange}
              onSelect={handleInventoryChange}
              options={formattedInventories}
              className="custom-multiselect"
              avoidHighlightFirstOption={true}
              style={{
                chips: { background: "#efc55f" },
                searchBox: { border: "1px solid #317879" },
              }}
            />
          </div>
          <div className="flex my-4 gap-x-4">
            <Button text="Add Store" />
            <Button text="Close" onClick={() => navigate("/dashboard")} />
          </div>
        </form>
      </div>
      {popupMessage && (
        <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button text="OK" onClick={handlePopupClose} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default AddStore;

