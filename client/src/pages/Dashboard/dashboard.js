// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchStoresWithOwners,
// //   deleteStore,
// // } from "../../redux/slices/adminSlice/adminSlice";
// // import Card from "../../components/card/Card";
// // import { useNavigate } from "react-router-dom";
// // import Cookies from "js-cookie";
// // import { logout } from "../../redux/slices/auth/authSlice";
// // import { RingLoader } from "react-spinners";

// // const Dashboard = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const stores = useSelector((state) => state.admin.stores);
// //   const status = useSelector((state) => state.admin.storesStatus);
// //   const error = useSelector((state) => state.admin.storesError);

// //   useEffect(() => {
// //     const token = Cookies.get("token") || localStorage.getItem("token");
// //     if (!token) {
// //       dispatch(logout());
// //       navigate("/");
// //     }
// //   }, [dispatch, navigate]);

// //   useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(fetchStoresWithOwners());
// //     }
// //   }, [status, dispatch]);

// //   if (status === "loading") {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <RingLoader size={60} color="#191343" loading={true} />
// //       </div>
// //     );
// //   }
// //   if (status === "failed") {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (!stores || stores.length === 0) {
// //     return <div>No stores available.</div>;
// //   }

// //   console.log("storesssss:", stores);

// //   return (
// //     <div className="p-6">
// //       <div className="flex ">
// //         <div className="flex bg-slate-300  items-center rounded-lg p-3 m-3 w-4/5">
// //           <svg
// //             className="w-5 h-5 text-gray-400"
// //             fill="currentColor"
// //             viewBox="0 0 20 20"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               fillRule="evenodd"
// //               d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
// //               clipRule="evenodd"
// //             />
// //           </svg>
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="bg-slate-300 w-full ml-2 outline-none"
// //           />
// //         </div>
// //         <button
// //           className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5"
// //           onClick={() => navigate("/dashboard/create-store")}
// //         >
// //           Add Store
// //         </button>
// //       </div>
// //       <h1 className="text-3xl mx-4 my-2 font-bold text-primary">Stores</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
// //         {stores.map((store) => (
// //           <Card
// //             key={store.id} 
// //             storeId={store.id} 
// //             storeName={store.storeName} 
// //             storeLocation={store.storeLocation}
// //             owners={store.owners}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStoresWithOwners, deleteStore } from "../../redux/slices/adminSlice/adminSlice";
// import Card from "../../components/card/Card";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { logout } from "../../redux/slices/auth/authSlice";
// import { RingLoader } from "react-spinners";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const stores = useSelector((state) => state.admin.stores);
//   const status = useSelector((state) => state.admin.storesStatus);
//   const error = useSelector((state) => state.admin.storesError);
//   const [popupMessage, setPopupMessage] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("token") || localStorage.getItem("token");
//     if (!token) {
//       dispatch(logout());
//       navigate("/");
//     }
//   }, [dispatch, navigate]);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchStoresWithOwners());
//     }
//   }, [status, dispatch]);

//   const handleDeleteStore = async (storeId) => {
//     try {
//       await dispatch(deleteStore(storeId)).unwrap();
//       setPopupMessage("Store deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete store:", error);
//       setPopupMessage("Failed to delete store.");
//     }
//   };

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <RingLoader size={60} color="#191343" loading={true} />
//       </div>
//     );
//   }

//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }
//   const filteredStores = stores.filter((store) =>
//     store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (!stores || stores.length === 0) {
//     return (<div>
//             <div className="flex ">
//         <div className="flex bg-slate-300  items-center rounded-lg p-3 m-3 w-4/5">
//           <svg
//             className="w-5 h-5 text-gray-400"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-slate-300 w-full ml-2 outline-none"
//           />
//         </div>
//         <button
//           className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5"
//           onClick={() => navigate("/dashboard/create-store")}
//         >
//           Add Store
//         </button>
//       </div>
//       <h1 className="text-3xl mx-4 my-2 font-bold text-primary">Stores</h1>
//       <h3 className="ml-6">No stores available.</h3>
//       </div>
//       );
//   }

//   console.log("storesssss:", stores);

//   return (
//     <div className="p-6">
//       <div className="flex ">
//         <div className="flex bg-slate-300  items-center rounded-lg p-3 m-3 w-4/5">
//           <svg
//             className="w-5 h-5 text-gray-400"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12.9 14.32a8 8 0 111.414-1.414l4.348 4.348a1 1 0 01-1.414 1.414l-4.348-4.348zM8 14a6 6 0 100-12 6 6 0 000 12z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-slate-300 w-full ml-2 outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <button
//           className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5"
//           onClick={() => navigate("/dashboard/create-store")}
//         >
//           Add Store
//         </button>
//       </div>
//       <h1 className="text-3xl mx-4 my-2 font-bold text-primary">Stores</h1>
//       {filteredStores.length === 0 ? (
//         <div className="p-4 text-center">No stores found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//           {filteredStores.map((store) => (
//             <Card
//               key={store.id} // Ensure the key is unique
//               storeId={store.id} // Pass store ID
//               storeName={store.storeName} // Adjust field names if needed
//               // storeLocation={store.storeLocation}
//               owners={store.owners}
//             />
//           ))}
//         </div>
//       {popupMessage && (
//         <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
//           <div className="popup-content">
//             {popupMessage}
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresWithOwners, deleteStore } from "../../redux/slices/adminSlice/adminSlice";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../redux/slices/auth/authSlice";
import { RingLoader } from "react-spinners";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const stores = useSelector((state) => state.admin.stores);
  const status = useSelector((state) => state.admin.storesStatus);
  const error = useSelector((state) => state.admin.storesError);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
      navigate("/");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStoresWithOwners());
    }
  }, [status, dispatch]);

  const handleDeleteStore = async (storeId) => {
    try {
      await dispatch(deleteStore(storeId)).unwrap();
      setPopupMessage("Store deleted successfully!");
    } catch (error) {
      console.error("Failed to delete store:", error);
      setPopupMessage("Failed to delete store.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader size={60} color="#191343" loading={true} />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const filteredStores = stores.filter((store) =>
    store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!stores || stores.length === 0) {
    return (
      <div>
        <div className="flex ">
          <div className="flex bg-slate-300  items-center rounded-lg p-3 m-3 w-4/5">
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
              className="bg-slate-300 w-full ml-2 outline-none"
            />
          </div>
          <button
            className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5"
            onClick={() => navigate("/dashboard/create-store")}
          >
            Add Store
          </button>
        </div>
        <h1 className="text-3xl mx-4 my-2 font-bold text-primary">Stores</h1>
        <h3 className="ml-6">No stores available.</h3>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex ">
        <div className="flex bg-slate-300  items-center rounded-lg p-3 m-3 w-4/5">
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
            className="bg-slate-300 w-full ml-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="text-primary font-bold bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5"
          onClick={() => navigate("/dashboard/create-store")}
        >
          Add Store
        </button>
      </div>
      <h1 className="text-3xl mx-4 my-2 font-bold text-primary">Stores</h1>
      {filteredStores.length === 0 ? (
        <div className="p-4 text-center">No stores found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredStores.map((store) => (
            <Card
              key={store.id} // Ensure the key is unique
              storeId={store.id} // Pass store ID
              storeName={store.storeName} // Adjust field names if needed
              storeLocation={store.storeLocation}
              owners={store.owners}
            />
          ))}
        </div>
      )}
      {popupMessage && (
        <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
          <div className="popup-content">
            {popupMessage}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setPopupMessage(null)}
            >
              OK
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Dashboard;


