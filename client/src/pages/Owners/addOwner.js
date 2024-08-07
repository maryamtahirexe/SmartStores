// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOwners,
//   createOwner,
//   deleteOwner,
//   updateOwner,
// } from "../../redux/slices/ownerSlice/ownerSlice";
// import InputField from "../../components/inputField/inputField";
// import Button from "../../components/Button/button";
// import { useNavigate, useLocation } from "react-router-dom";

// const AddOwner = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const editOwner = location.state?.owner; 

//   useEffect(() => {
//     if (editOwner) {
//       setFormData({ name: editOwner.name, email: editOwner.email, password: "" });
//     }
//   }, [editOwner]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editOwner) {
//       dispatch(updateOwner({ id: editOwner._id, ...formData }));
//       navigate("/dashboard/owner");
//     } else {
//       dispatch(createOwner(formData));
//       navigate("/dashboard/owner");
//     }
//     setFormData({ name: "", email: "", password: "" });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">
//           {editOwner ? "Edit Owner" : "Add Owner"}
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             name="name"
//             id="name"
//             placeholder="Enter owner's name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Email"
//             name="email"
//             id="email"
//             placeholder="Enter owner's email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             id="password"
//             placeholder="Enter owner's password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button text={editOwner ? "Update Owner" : "Create Owner"} />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddOwner;
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { createOwner, updateOwner } from "../../redux/slices/ownerSlice/ownerSlice";
// import InputField from "../../components/inputField/inputField";
// import Button from "../../components/Button/button";
// import { useNavigate, useLocation } from "react-router-dom";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const AddOwner = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [popupMessage, setPopupMessage] = useState(null);
//   const editOwner = location.state?.owner;

//   useEffect(() => {
//     if (editOwner) {
//       setFormData({ name: editOwner.name, email: editOwner.email, password: "" });
//     }
//   }, [editOwner]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editOwner) {
//         await dispatch(updateOwner({ id: editOwner._id, ...formData })).unwrap();
//         setPopupMessage("Owner updated successfully");
//       } else {
//         await dispatch(createOwner(formData)).unwrap();
//         setPopupMessage("Owner created successfully");
//       }
//       setFormData({ name: "", email: "", password: "" });
//       navigate("/dashboard/owner");
//     } catch (error) {
//       setPopupMessage("Failed to save owner");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">
//           {editOwner ? "Edit Owner" : "Add Owner"}
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             name="name"
//             id="name"
//             placeholder="Enter owner's name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Email"
//             name="email"
//             id="email"
//             placeholder="Enter owner's email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             id="password"
//             placeholder="Enter owner's password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button text={editOwner ? "Update Owner" : "Create Owner"} />
//         </form>
//         {popupMessage && (
//           <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
//             <div className="bg-white p-4 rounded-lg shadow-lg text-center">
//               <p className="text-lg">{popupMessage}</p>
//               <button
//                 className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 onClick={() => setPopupMessage(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </Popup>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddOwner;
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { createOwner, updateOwner } from "../../redux/slices/ownerSlice/ownerSlice";
// import InputField from "../../components/inputField/inputField";
// import Button from "../../components/Button/button";
// import { useNavigate, useLocation } from "react-router-dom";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const AddOwner = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [popupType, setPopupType] = useState(null); // 'success' or 'error'
//   const editOwner = location.state?.owner;

//   useEffect(() => {
//     if (editOwner) {
//       setFormData({ name: editOwner.name, email: editOwner.email, password: "" });
//     }
//   }, [editOwner]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editOwner) {
//         await dispatch(updateOwner({ id: editOwner._id, ...formData })).unwrap();
//         setPopupMessage("Owner updated successfully");
//         setPopupType('success');
//       } else {
//         await dispatch(createOwner(formData)).unwrap();
//         setPopupMessage("Owner created successfully");
//         setPopupType('success');
//       }
//       setFormData({ name: "", email: "", password: "" });
//       setTimeout(() => navigate("/dashboard/owner"), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       setPopupMessage("Failed to save owner or Owner already existed");
//       setPopupType('error');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">
//           {editOwner ? "Edit Owner" : "Add Owner"}
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             name="name"
//             id="name"
//             placeholder="Enter owner's name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Email"
//             name="email"
//             id="email"
//             placeholder="Enter owner's email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             id="password"
//             placeholder="Enter owner's password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button text={editOwner ? "Update Owner" : "Create Owner"} />
//         </form>
//         {popupMessage && (
//           <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
//             <div className={`bg-white p-4 rounded-lg shadow-lg text-center ${popupType === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
//               <p className={`text-lg ${popupType === 'success' ? 'text-green-800' : 'text-red-800'}`}>{popupMessage}</p>
//               <button
//                 className={`mt-4 px-4 py-2 ${popupType === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg`}
//                 onClick={() => setPopupMessage(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </Popup>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddOwner;
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { createOwner, updateOwner } from "../../redux/slices/ownerSlice/ownerSlice";
// import InputField from "../../components/inputField/inputField";
// import Button from "../../components/Button/button";
// import { useNavigate, useLocation } from "react-router-dom";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const AddOwner = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [popupType, setPopupType] = useState(null); // 'success' or 'error'
//   const editOwner = location.state?.owner;

//   useEffect(() => {
//     if (editOwner) {
//       setFormData({ name: editOwner.name, email: editOwner.email, password: "" });
//     }
//   }, [editOwner]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editOwner) {
//         await dispatch(updateOwner({ id: editOwner._id, ...formData })).unwrap();
//         setPopupMessage("Owner updated successfully");
//         setPopupType('success');
//       } else {
//         await dispatch(createOwner(formData)).unwrap();
//         setPopupMessage("Owner created successfully");
//         setPopupType('success');
//       }
//       setFormData({ name: "", email: "", password: "" });
//       setTimeout(() => navigate("/dashboard/owner"), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       setPopupMessage("Failed to save owner or Owner already existed");
//       setPopupType('error');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">
//           {editOwner ? "Edit Owner" : "Add Owner"}
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Name"
//             name="name"
//             id="name"
//             placeholder="Enter owner's name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Email"
//             name="email"
//             id="email"
//             placeholder="Enter owner's email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             id="password"
//             placeholder="Enter owner's password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button text={editOwner ? "Update Owner" : "Create Owner"} />
//         </form>
//         {popupMessage && (
//           <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick={false}>
//             <div className={`bg-white p-4 rounded-lg shadow-lg text-center ${popupType === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
//               <p className={`text-lg ${popupType === 'success' ? 'text-green-800' : 'text-red-800'}`}>{popupMessage}</p>
//               <button
//                 className={`mt-4 px-4 py-2 ${popupType === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg`}
//                 onClick={() => setPopupMessage(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </Popup>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddOwner;

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
  const [popupType, setPopupType] = useState(null); // 'success' or 'error'
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
          <Button text={editOwner ? "Update Owner" : "Create Owner"} />
          <Button text="Close" onClick= {() => navigate("/dashboard")}/>
        </form>
        {popupMessage && (
          <Popup open={true} onClose={closePopup} closeOnDocumentClick={false}>
            <div className={`bg-white p-4 rounded-lg shadow-lg text-center ${popupType === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-lg ${popupType === 'success' ? 'text-green-800' : 'text-red-800'}`}>{popupMessage}</p>
              <button
                className={`mt-4 px-4 py-2 ${popupType === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg`}
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default AddOwner;

