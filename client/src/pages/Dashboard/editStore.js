// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import { updateStore, fetchStoreById, fetchOwnersByStoreId } from "../../redux/slices/adminSlice/adminSlice";

// const EditStore = () => {
//   const { storeId } = useParams();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     ownerIds: [],
//   });

//   const [allOwners, setAllOwners] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const owners = useSelector((state) => state.admin.owners);
//   const store = useSelector((state) => state.admin.store);
//   const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
//   const updateStoreError = useSelector((state) => state.admin.updateStoreError);

//   useEffect(() => {
//     dispatch(fetchStoreById(storeId));
//     dispatch(fetchOwnersByStoreId(storeId)).then((response) => {
//       console.log("Fetched Owners:", response.payload); // Log the fetched owners
//       setAllOwners(response.payload); // Storing the fetched owners in a local state variable
//     });
//   }, [dispatch, storeId]);

//   useEffect(() => {
//     if (store) {
//       setFormData({
//         name: store.name || "",
//         location: store.location || "",
//         ownerIds: store.owners.map((owner) => owner._id) || [],
//       });
//     }
//   }, [store]);

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
//       ownerIds: selectedOwners.map((owner) => owner._id),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data to be submitted:", formData);
//     try {
//       await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Failed to update store:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
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
//             options={allOwners} // Ensure this is correctly populated
//             selectedValues={allOwners.filter((owner) => formData.ownerIds.includes(owner._id))}
//             onSelect={handleOwnersChange}
//             onRemove={handleOwnersChange}
//             displayValue="name"
//             placeholder="Select owners"
//           />
//         </div>
//         <Button text="Submit"/>
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
// import { updateStore, fetchStoreById, fetchOwnersByStoreId } from "../../redux/slices/adminSlice/adminSlice";

// const EditStore = () => {
//   const { storeId } = useParams();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     ownerIds: [],
//   });

//   const [allOwners, setAllOwners] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const owners = useSelector((state) => state.admin.owners);
//   const store = useSelector((state) => state.admin.store);
//   const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
//   const updateStoreError = useSelector((state) => state.admin.updateStoreError);

//   useEffect(() => {
//     dispatch(fetchStoreById(storeId));
//     dispatch(fetchOwnersByStoreId(storeId)).then((response) => {
//       console.log("Fetched Owners:", response.payload); // Log the fetched owners
//       setAllOwners(response.payload); // Storing the fetched owners in a local state variable
//     });
//   }, [dispatch, storeId]);

//   useEffect(() => {
//     if (store) {
//       setFormData({
//         name: store.name || "",
//         location: store.location || "",
//         ownerIds: store.owners.map((owner) => owner._id) || [],
//       });
//     }
//   }, [store]);

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
//       ownerIds: selectedOwners.map((owner) => owner._id),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data to be submitted:", formData);
//     try {
//       await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Failed to update store:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
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
//             options={allOwners} // Ensure this is correctly populated
//             selectedValues={allOwners.filter((owner) => formData.ownerIds.includes(owner._id))}
//             onSelect={handleOwnersChange}
//             onRemove={handleOwnersChange}
//             displayValue="name"
//             placeholder="Select owners"
//           />
//         </div>
//         <Button text="Submit"/>
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
import { updateStore, fetchStoreById, fetchOwners } from "../../redux/slices/adminSlice/adminSlice";

const EditStore = () => {
  const { storeId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ownerIds: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const owners = useSelector((state) => state.admin.owners);
  const store = useSelector((state) => state.admin.store);
  const updateStoreStatus = useSelector((state) => state.admin.updateStoreStatus);
  const updateStoreError = useSelector((state) => state.admin.updateStoreError);

  useEffect(() => {
    dispatch(fetchStoreById(storeId));
    dispatch(fetchOwners());
  }, [dispatch, storeId]);

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name || "",
        location: store.location || "",
        ownerIds: store.owners.map((owner) => owner._id) || [],
      });
    }
  }, [store]);

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
      ownerIds: selectedOwners.map((owner) => owner._id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data to be submitted:", formData);
    try {
      await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update store:", error);
    }
  };

  const formattedOwners = owners.map((owner) => ({
    _id: owner._id,
    name: owner.name,
  }));

  return (
    <div className="flex justify-center items-center min-h-screen">
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
            options={formattedOwners} // Ensure this is correctly populated
            selectedValues={formattedOwners.filter((owner) => formData.ownerIds.includes(owner._id))}
            onSelect={handleOwnersChange}
            onRemove={handleOwnersChange}
            displayValue="name"
            placeholder="Select owners"
          />
        </div>
        <Button text="Submit" />
        {updateStoreStatus === "loading" && <p>Updating...</p>}
        {updateStoreStatus === "failed" && <p>Error: {updateStoreError}</p>}
      </form>
    </div>
  );
};

export default EditStore;

