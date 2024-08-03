// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStoresWithOwners } from "../../redux/slices/adminSlice/adminSlice";
// import Card from "../../components/card/Card";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { logout } from "../../redux/slices/auth/authSlice";


// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const stores = useSelector((state) => state.admin.stores);
//   const status = useSelector((state) => state.admin.storesStatus);
//   const error = useSelector((state) => state.admin.storesError);

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

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div >
//       <div className="flex">
//         <div className="flex bg-slate-300 items-center rounded-lg p-3 m-3 w-4/5">
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
//             className="bg-slate-300 ml-2 outline-none text-black"
//           />
//         </div>
//         <button className="text-black bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5" onClick={() => navigate("/dashboard/create-store")}>
//           Add Course
//         </button>
//       </div>
//       <h1 className="text-3xl mx-4 my-2 font-bold text-purple-900">Stores</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {stores.map((store) => (
//           <Card
//             key={store.storeName}
//             storeName={store.storeName}
//             storeLocation={store.storeLocation}
//             owners={store.owners}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresWithOwners, deleteStore } from "../../redux/slices/adminSlice/adminSlice";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../redux/slices/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stores = useSelector((state) => state.admin.stores);
  const status = useSelector((state) => state.admin.storesStatus);
  const error = useSelector((state) => state.admin.storesError);
  
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!stores || stores.length === 0) {
    return <div>No stores available.</div>;
  }

  console.log("storesssss:" ,stores);
 
  return (
    <div>
      <div className="flex">
        <div className="flex bg-slate-300 items-center rounded-lg p-3 m-3 w-4/5">
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
            className="bg-slate-300 ml-2 outline-none text-black"
          />
        </div>
        <button className="text-black bg-slate-300 items-center rounded-lg p-3 m-3 w-1/5" onClick={() => navigate("/dashboard/create-store")}>
          Add Store
        </button>
      </div>
      <h1 className="text-3xl mx-4 my-2 font-bold text-purple-900">Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {stores.map((store) => (
          <Card
            key={store.id} // Ensure the key is unique
            storeId={store.id} // Pass store ID
            storeName={store.storeName} // Adjust field names if needed
            storeLocation={store.storeLocation}
            owners={store.owners}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
