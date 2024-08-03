// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import { fetchOwners, updateStore, fetchStoreById } from "../../redux/slices/adminSlice/adminSlice";

// const EditStore = () => {
//   const { storeId } = useParams();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     owners: [],
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const owners = useSelector((state) => state.admin.owners);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const ownersError = useSelector((state) => state.admin.ownersError);
//   const store = useSelector((state) => state.admin.store);
//   const storeStatus = useSelector((state) => state.admin.storeStatus);
//   const storeError = useSelector((state) => state.admin.storeError);
//   const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
//   const updateStoreError = useSelector((state) => state.admin.updateStoreError);

//   useEffect(() => {
//     if (ownersStatus === "idle") {
//       dispatch(fetchOwners());
//     }
//   }, [ownersStatus, dispatch]);

//   useEffect(() => {
//     console.log('Fetching store with ID:', storeId);
//     console.log(storeStatus);
//     if (storeStatus === 'idle') {
//       dispatch(fetchStoreById(storeId));
//       console.log('Store fetched in if :', store);
//     } else if (storeStatus === 'succeeded') {
//       console.log('Store fetched:', store);
//       setFormData({
//         name: store.name,
//         location: store.location,
//         owners: store.owners.map((owner) => owner.id),
//       });
//     }
//   }, [storeId, storeStatus, dispatch, store]);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleOwnersChange = (selectedOwners) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       owners: selectedOwners.map((owner) => owner.id),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Failed to update store:", error);
//     }
//   };

//   if (ownersStatus === "loading" || storeStatus === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (ownersStatus === "failed") {
//     return <div>Error: {ownersError}</div>;
//   }

//   if (storeStatus === "failed") {
//     return <div>Error: {storeError}</div>;
//   }

//   return (
//     <div className="flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-10 rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-purple-900">Edit Store</h1>
//         <InputField
//           label="Store Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <InputField
//           label="Store Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Owners
//           </label>
//           <Multiselect
//             options={owners}
//             selectedValues={owners.filter((owner) => formData.owners.includes(owner.id))}
//             onSelect={handleOwnersChange}
//             onRemove={handleOwnersChange}
//             displayValue="name"
//             placeholder="Select owners"
//           />
//         </div>
//         <Button type="submit">Update Store</Button>
//         {updateStoreStatus === "loading" && <p>Updating...</p>}
//         {updateStoreStatus === "failed" && <p>Error: {updateStoreError}</p>}
//       </form>
//     </div>
//   );
// };

// export default EditStore;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import { fetchOwners, updateStore, fetchStoreById } from "../../redux/slices/adminSlice/adminSlice";

// const EditStore = () => {
//   const { storeId } = useParams();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     owners: [],
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const owners = useSelector((state) => state.admin.owners);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const ownersError = useSelector((state) => state.admin.ownersError);
//   const store = useSelector((state) => state.admin.store);
//   const storeStatus = useSelector((state) => state.admin.storeStatus);
//   const storeError = useSelector((state) => state.admin.storeError);
//   const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
//   const updateStoreError = useSelector((state) => state.admin.updateStoreError);

 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleOwnersChange = (selectedOwners) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       owners: selectedOwners.map((owner) => owner.id),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Failed to update store:", error);
//     }
//   };

//   if (ownersStatus === "loading" || storeStatus === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (ownersStatus === "failed") {
//     return <div>Error: {ownersError}</div>;
//   }

//   if (storeStatus === "failed") {
//     return <div>Error: {storeError}</div>;
//   }

//   return (
//     <div className="flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-10 rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-purple-900">Edit Store</h1>
//         <InputField
//           label="Store Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <InputField
//           label="Store Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Owners
//           </label>
//           <Multiselect
//             options={owners} // Make sure this is correctly populated
//             selectedValues={owners.filter((owner) => formData.owners.includes(owner.id))}
//             onSelect={handleOwnersChange}
//             onRemove={handleOwnersChange}
//             displayValue="name"
//             placeholder="Select owners"
//           />
//         </div>
//         <Button type="submit">Update Store</Button>
//         {updateStoreStatus === "loading" && <p>Updating...</p>}
//         {updateStoreStatus === "failed" && <p>Error: {updateStoreError}</p>}
//       </form>
//     </div>
//   );
// };

// export default EditStore;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Button/button";
import InputField from "../../components/inputField/inputField";
import { updateStore, fetchStoreById, fetchOwnersByStoreId } from "../../redux/slices/adminSlice/adminSlice";

const EditStore = () => {
  const { storeId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owners: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const owners = useSelector((state) => state.admin.owners);
  const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
  const updateStoreError = useSelector((state) => state.admin.updateStoreError);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOwnersChange = (selectedOwners) => {
    setFormData((prevState) => ({
      ...prevState,
      owners: selectedOwners.map((owner) => owner.id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update store:", error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-purple-900">Edit Store</h1>
        <InputField
          label="Store Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Store Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Owners
          </label>
          <Multiselect
            options={owners} // Ensure this is correctly populated
            selectedValues={owners.filter((owner) => formData.owners.includes(owner.id))}
            onSelect={handleOwnersChange}
            onRemove={handleOwnersChange}
            displayValue="name"
            placeholder="Select owners"
          />
        </div>
        <Button type="submit">Update Store</Button>
        {updateStoreStatus === "loading" && <p>Updating...</p>}
        {updateStoreStatus === "failed" && <p>Error: {updateStoreError}</p>}
      </form>
    </div>
  );
};

export default EditStore;
