// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Multiselect from "multiselect-react-dropdown";
// import Button from "../../components/Button/button";
// import InputField from "../../components/inputField/inputField";
// import {
//   updateStore,
//   fetchStoreById,
//   fetchOwners,
// } from "../../redux/slices/adminSlice/adminSlice";
// import { RingLoader } from "react-spinners";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

// const EditStore = () => {
//   const { storeId } = useParams();
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     ownerIds: [],
//   });

//   const [popupMessage, setPopupMessage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const owners = useSelector((state) => state.admin.owners);
//   const store = useSelector((state) => state.admin.store);
//   const ownersStatus = useSelector((state) => state.admin.ownersStatus);
//   const storeStatus = useSelector((state) => state.admin.storeStatus);
//   const updateStoreStatus = useSelector(
//     (state) => state.admin.updateStoreStatus
//   );
//   const updateStoreError = useSelector((state) => state.admin.updateStoreError);

//   useEffect(() => {
//     dispatch(fetchStoreById(storeId));
//     dispatch(fetchOwners());
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
//     try {
//       await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
//       setPopupMessage("Store updated successfully!");
//     } catch (error) {
//       console.error("Failed to update store:", error);
//       setPopupMessage("Failed to update store.");
//     }
//   };

//   const handlePopupClose = () => {
//     setPopupMessage(null);
//     navigate("/dashboard");
//   };

//   const formattedOwners = owners.map((owner) => ({
//     _id: owner._id,
//     name: owner.name,
//   }));

//   if (ownersStatus === "loading" || storeStatus === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <RingLoader size={60} color="#191343" loading={true} />
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full  max-w-md bg-primary shadow-2xl p-10 rounded-lg"
//       >
//         <h1 className="text-3xl text-highlight mb-6 text-center">Edit Store</h1>
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
//         <div className="mt-4">
//           <label
//             htmlFor="owners"
//             className="block text-sm font-medium text-highlight"
//           >
//             Owner
//           </label>
//           <Multiselect
//             options={formattedOwners}
//             selectedValues={formattedOwners.filter((owner) =>
//               formData.ownerIds.includes(owner._id)
//             )}
//             onSelect={handleOwnersChange}
//             onRemove={handleOwnersChange}
//             displayValue="name"
//             className="custom-multiselect"
//             avoidHighlightFirstOption={true}
//             style={{
//               chips: { background: "#efc55f" },
//               searchBox: { border: "1px solid #317879" },
//             }}
//           />
//         </div>
//         <div className="flex my-4 gap-x-4">
//           <Button text="Submit" />
//           <Button text="Close" onClick={() => navigate("/dashboard")} />
//         </div>
//        </form>
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

// export default EditStore;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../components/Button/button";
import InputField from "../../components/inputField/inputField";
import {
  updateStore,
  fetchStoreById,
  fetchOwners,
  fetchInventories,
} from "../../redux/slices/adminSlice/adminSlice";
import { RingLoader } from "react-spinners";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const EditStore = () => {
  const { storeId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ownerIds: [],
    inventoryIds: [],
  });

  const [popupMessage, setPopupMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const owners = useSelector((state) => state.admin.owners);
  const inventories = useSelector((state) => state.admin.inventories);
  const store = useSelector((state) => state.admin.store);
  const ownersStatus = useSelector((state) => state.admin.ownersStatus);
  const inventoriesStatus = useSelector(
    (state) => state.admin.inventoriesStatus
  );
  const storeStatus = useSelector((state) => state.admin.storeStatus);
  const updateStoreStatus = useSelector(
    (state) => state.admin.updateStoreStatus
  );

  useEffect(() => {
    dispatch(fetchStoreById(storeId));
    dispatch(fetchOwners());
    dispatch(fetchInventories());
  }, [dispatch, storeId]);

  // useEffect(() => {
  //   if (store && Array.isArray(store.inventories)) {
  //     // Ensure that the inventories have valid data before mapping
  //     const inventoryIds = store.inventories
  //       .filter((inventory) => inventory && inventory._id)
  //       .map((inventory) => inventory._id);

  //     setFormData({
  //       name: store.name || "",
  //       location: store.location || "",
  //       ownerIds: store.owners.map((owner) => owner._id) || [],
  //       inventoryIds: inventoryIds,
  //     });
  //   }
  // }, [store]);
  useEffect(() => {
    console.log("Store:", store);
    console.log("Inventories:", inventories);
  
    if (store && Array.isArray(store.inventories)) {
      console.log('Store Inventories:', store.inventories);
  
      // Directly extract _id values into inventoryIds array
      const inventoryIds = store.inventories.map((inventory) => inventory._id);
  
      console.log('Inventory IDs:', inventoryIds);
  
      setFormData({
        name: store.name || "",
        location: store.location || "",
        ownerIds: store.owners.map((owner) => owner._id) || [],
        inventoryIds: store.inventories,
      });
    } else {
      console.log(
        "Store or inventories not available or not in the expected format"
      );
    }
  }, [store, inventories]);
  // useEffect(() => {
  //   console.log("Store:", store);
  //   console.log("Inventories:", inventories);

  //   if (store && Array.isArray(store.inventories)) {
  //     console.log('Store Inventories:', store.inventories);
    
  //     const inventoryIds = store.inventories.map((inventory) => {
  //       console.log('Processing Inventory:', inventory);
  //       if (inventory && inventory._id) {
  //         return inventory._id;
  //       } else {
  //         console.warn('Invalid inventory item:', inventory);
  //         return ""; // Handle invalid data
  //       }
  //     }).filter(id => id !== ""); // Filter out null values
    
  //     console.log('Inventory IDs:', inventoryIds);
    
  //     setFormData({
  //       name: store.name || "",
  //       location: store.location || "",
  //       ownerIds: store.owners.map((owner) => owner._id) || [],
  //       inventoryIds: inventoryIds,
  //     });
  //   } else {
  //     console.log(
  //       "Store or inventories not available or not in the expected format"
  //     );
  //   }
  // }, [store, inventories]);

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

  const handleInventoriesChange = (selectedInventories) => {
    setFormData((prevState) => ({
      ...prevState,
      inventoryIds: selectedInventories.map((inventory) => inventory._id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateStore({ id: storeId, ...formData })).unwrap();
      setPopupMessage("Store updated successfully!");
    } catch (error) {
      console.error("Failed to update store:", error);
      setPopupMessage("Failed to update store.");
    }
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
    navigate("/dashboard");
  };

  const formattedOwners = owners.map((owner) => ({
    _id: owner._id,
    name: owner.name,
  }));

  const formattedInventories = inventories.map((inventory) => ({
    _id: inventory._id,
    name: inventory.name,
  }));

  if (
    ownersStatus === "loading" ||
    storeStatus === "loading" ||
    inventoriesStatus === "loading"
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader size={60} color="#191343" loading={true} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-primary shadow-2xl p-10 rounded-lg"
      >
        <h1 className="text-3xl text-highlight mb-6 text-center">Edit Store</h1>
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
        <div className="mt-4">
          <label
            htmlFor="owners"
            className="block text-sm font-medium text-highlight"
          >
            Owners
          </label>
          <Multiselect
            options={formattedOwners}
            selectedValues={formattedOwners.filter((owner) =>
              formData.ownerIds.includes(owner._id)
            )}
            onSelect={handleOwnersChange}
            onRemove={handleOwnersChange}
            displayValue="name"
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
            options={formattedInventories}
            selectedValues={formattedInventories.filter((inventory) =>
              formData.inventoryIds.includes(inventory._id)
            )}
            onSelect={handleInventoriesChange}
            onRemove={handleInventoriesChange}
            displayValue="name"
            className="custom-multiselect"
            avoidHighlightFirstOption={true}
            style={{
              chips: { background: "#efc55f" },
              searchBox: { border: "1px solid #317879" },
            }}
          />
        </div>
        <div className="flex my-4 gap-x-4">
          <Button text="Submit" />
          <Button text="Close" onClick={() => navigate("/dashboard")} />
        </div>
      </form>
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

export default EditStore;
