

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAdmin, clearMessage, clearError } from '../../redux/slices/updateSlice/updateSlice';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// const ProfilePage = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, message, error } = useSelector((state) => state.update);

//   useEffect(() => {
//     if (message) {
//       setPopupMessage(message);
//       dispatch(clearMessage());
//     }
//     if (error) {
//       setPopupMessage(error);
//       dispatch(clearError());
//     }
//   }, [message, error, dispatch]);

//   const handleUpdate = () => {
//     setShowConfirmation(true); 
//   };

//   const confirmUpdate = async () => {
//     try {
//         const response = await dispatch(updateAdmin({ email, oldPassword, password: newPassword })).unwrap();

//         if (response.status === 'success') {
//             setPopupMessage('Profile updated successfully');
//             setTimeout(() => {
//                 setPopupMessage(null);
//             }, 3000);
//         } else {
//             // If the backend returns an error status
//             setPopupMessage(response.message || 'Failed to update profile');
//         }

//         setShowConfirmation(false);
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         setPopupMessage(error.message || 'Failed to update profile');
//     }
// };


//   const handleNavigateToUpdateEmail = () => {
//     navigate('./updateEmail');
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center">
//       <div className="w-full max-w-md bg-primary p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-highlight">Profile</h2>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-4 flex items-center">
//             <label className="block text-highlight mb-2 w-full" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
//             />
//             <button
//               type="button"
//               onClick={handleNavigateToUpdateEmail}
//               className="ml-4 text-highlight hover:text-highlight transition-colors duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="mb-4">
//             <label className="block text-highlight mb-2" htmlFor="oldPassword">Old Password</label>
//             <input
//               type="password"
//               id="oldPassword"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-highlight mb-2" htmlFor="newPassword">New Password</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={handleUpdate}
//               className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight"
//               disabled={loading}
//             >
//               {loading ? 'Updating...' : 'Update'}
//             </button>
//             <button
//               type="button"
//               className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>

//         {popupMessage && (
//           <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
//             <div className="w-full text-center p-4 rounded-lg shadow-lg">
//               {popupMessage}
//             </div>
//           </Popup>
//         )}

//         {showConfirmation && (
//           <Popup open={true} onClose={() => setShowConfirmation(false)} closeOnDocumentClick>
//             <div className="w-full text-center p-4 rounded-lg shadow-lg">
//               <p>Are you sure you want to change your password?</p>
//               <button onClick={confirmUpdate} className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight mt-4">Confirm</button>
//               <button onClick={() => setShowConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4 mt-4">Cancel</button>
//             </div>
//           </Popup>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateAdmin, clearMessage, clearError } from '../../redux/slices/updateSlice/updateSlice';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import axios from 'axios';  // Import axios for API calls
// import { API } from '../../utils/api';

// const ProfilePage = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, message, error } = useSelector((state) => state.update);

//   // Fetch email from backend
//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const response = await API.get('/auth/admin'); 
//          setEmail(response.data.email);
//       } catch (error) {
//         console.error('Error fetching email:', error);
//         setPopupMessage('Failed to load email');
//       }
//     };
//     fetchEmail();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       setPopupMessage(message);
//       dispatch(clearMessage());
//     }
//     if (error) {
//       setPopupMessage(error);
//       dispatch(clearError());
//     }
//   }, [message, error, dispatch]);

//   const handleUpdate = () => {
//     setShowConfirmation(true); 
//   };

//   const confirmUpdate = async () => {
//     try {
//       const response = await dispatch(updateAdmin({ email, oldPassword, password: newPassword })).unwrap();

//       if (response.status === 'success') {
//         setPopupMessage('Profile updated successfully');
//         setTimeout(() => {
//           setPopupMessage(null);
//         }, 3000);
//       } else {
//         // If the backend returns an error status
//         setPopupMessage(response.message || 'Failed to update profile');
//       }

//       setShowConfirmation(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setPopupMessage(error.message || 'Failed to update profile');
//     }
//   };

//   const handleNavigateToUpdateEmail = () => {
//     navigate('./updateEmail');
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <h2 className="text-2xl font-bold mb-6 text-highlight">Profile</h2>
//         <h2 className="text-2xl font-bold mb-6 text-center text-highlight">Profile</h2>
//         <div className="mb-4">
//           <label className="block text-highlight mb-2" htmlFor="email">Email</label>
//           <div
//             id="email"
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight bg-gray-100"
//           >
//             {email || 'Loading...'}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-highlight mb-2" htmlFor="oldPassword">Old Password</label>
//           <input
//             type="password"
//             id="oldPassword"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-highlight mb-2" htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-highlight"
//           />
//         </div>
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={handleUpdate}
//             className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight"
//             disabled={loading}
//           >
//             {loading ? 'Updating...' : 'Update'}
//           </button>
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>

//         {popupMessage && (
//           <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
//             <div className="w-full text-center p-4 rounded-lg shadow-lg">
//               {popupMessage}
//             </div>
//           </Popup>
//         )}

//         {showConfirmation && (
//           <Popup open={true} onClose={() => setShowConfirmation(false)} closeOnDocumentClick>
//             <div className="w-full text-center p-4 rounded-lg shadow-lg">
//               <p>Are you sure you want to change your password?</p>
//               <button onClick={confirmUpdate} className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-highlight mt-4">Confirm</button>
//               <button onClick={() => setShowConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4 mt-4">Cancel</button>
//             </div>
//           </Popup>
//         )}
//       </div>
//   );
// };

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin, clearMessage, clearError } from '../../redux/slices/updateSlice/updateSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'; 
import { API } from '../../utils/api';
import Button from '../../components/Button/button'; // Assuming you have a Button component similar to the Owners page

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.update);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await API.get('/auth/admin'); 
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching email:', error);
        setPopupMessage('Failed to load email');
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (message) {
      setPopupMessage(message);
      dispatch(clearMessage());
    }
    if (error) {
      setPopupMessage(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch]);

  const handleUpdate = () => {
    setShowConfirmation(true); 
  };

  const confirmUpdate = async () => {
    try {
      const response = await dispatch(updateAdmin({ email, oldPassword, password: newPassword })).unwrap();

      if (response.status === 'success') {
        setPopupMessage('Profile updated successfully');
        setTimeout(() => {
          setPopupMessage(null);
        }, 3000);
      } else {
        setPopupMessage(response.message || 'Failed to update profile');
      }

      setShowConfirmation(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setPopupMessage(error.message || 'Failed to update profile');
    }
  };

  const handleNavigateToUpdateEmail = () => {
    navigate('./updateEmail');
  };

  return (
    <div className="p-6 m-2"> 
      <h1 className="text-3xl mb-4 font-bold text-primary text-center">Profile</h1>
      <div className="mb-4">
        <label className="block text-primary mb-2" htmlFor="email">Email</label>
        <div
          id="email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary bg-gray-100"
        >
          {email || 'Loading...'}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-primary mb-2" htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-primary mb-2" htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-between">
        <Button
          text={loading ? 'Updating...' : 'Update'}
          onClick={handleUpdate}
          disabled={loading}
        />
        <Button
          text="Cancel"
          onClick={() => navigate(-1)} 
          variant="secondary" 
        />
      </div>

      {popupMessage && (
        <Popup open={true} onClose={() => setPopupMessage(null)} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            {popupMessage}
            <Button text="OK" onClick={() => setPopupMessage(null)} />
          </div>
        </Popup>
      )}

      {showConfirmation && (
        <Popup open={true} onClose={() => setShowConfirmation(false)} closeOnDocumentClick>
          <div className="w-full text-center p-4 rounded-lg shadow-lg">
            <p>Are you sure you want to change your password?</p>
            <div className="mt-4 gap-x-4 flex justify-around">
              <Button text="Confirm" onClick={confirmUpdate} />
              <Button text="Cancel" onClick={() => setShowConfirmation(false)} />
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ProfilePage;
