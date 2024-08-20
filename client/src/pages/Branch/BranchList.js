import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "../../components/Button/button";
import { fetchBranches, deleteBranch } from "../../redux/slices/adminSlice/adminSlice";

// const BranchList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { branches=[], loading, error } = useSelector((state) => state.admin.branches);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [branchToDelete, setBranchToDelete] = useState(null);
//   const [confirmationPopup, setConfirmationPopup] = useState(false);
//   const { storeId } = useParams();

//   useEffect(() => {
//     console.log("Fetching branches...");
//     dispatch(fetchBranches()).then((res) => console.log(res));
//   }, [dispatch]);

//   const handleEdit = (branch) => {
//     navigate(`/dashboard/store/${storeId}/branches/${branch._id}`);
//   };

//   const handleDelete = (id) => {
//     setBranchToDelete(id);
//     setPopupMessage("Are you sure you want to delete this branch?");
//     setConfirmationPopup(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await dispatch(deleteBranch({ storeId, id: branchToDelete })).unwrap();
//       setPopupMessage("Branch deleted successfully");
//     } catch (error) {
//       setPopupMessage("Failed to delete branch. Please try again.");
//     }
//     setConfirmationPopup(false);
//   };

//   const closePopup = () => {
//     setPopupMessage(null);
//     if (!confirmationPopup && branchToDelete) {
//       dispatch(fetchBranches(storeId));
//     }
//   };

//   const filteredBranches = branches?.filter((branch) =>
//     branch.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 m-2">
//       <div className="flex mb-6">
//         <div className="flex bg-slate-300 items-center rounded-lg p-3 w-4/5">
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
//             className="bg-slate-300 ml-2 w-full outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <button
//           className="text-primary font-bold bg-slate-300 rounded-lg p-3 ml-3 w-1/5"
//           onClick={() => navigate(`/dashboard/manage-branch`)}
//         >
//           Add Branch
//         </button>
//       </div>
//       {/* <h1 className="text-3xl mb-4 font-bold text-primary">Branches</h1>
//       <ul className="w-full divide-y divide-primary">
//         {filteredBranches.length === 0 ? (
//           <li className="p-4 text-center">No branches found.</li>
//         ) : (
//           filteredBranches.map((branch) => (
//             <li
//               key={branch._id}
//               className="flex justify-between items-center p-4 mb-2 rounded"
//             >
//               <span>{branch.name}</span>
//               <div className="flex space-x-2">
//                 <button onClick={() => handleEdit(branch)} aria-label="Edit">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V14"
//                     />
//                   </svg>
//                 </button>
//                 <button onClick={() => handleDelete(branch._id)} aria-label="Delete">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6 text-red-500 hover:text-red-600 transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 9.75v6.5M9 9.75v6.5M12 9.75v6.5M15 9.75v6.5M18 9.75v6.5M4.5 6h15a.75.75 0 0 1 .75.75v.75h-17v-.75A.75.75 0 0 1 4.5 6zm0 0h15m-9.75 6.75h-1.5M12 13.5h-1.5M6 6h15v12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V6z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </li>
//           ))
//         )}
//       </ul> */}
//             <h1 className="text-3xl mb-4 font-bold text-primary">Branches</h1>
//       <ul className="w-full divide-y divide-primary">
//         {filteredBranches.length === 0 ? (
//           <li className="p-4 text-center">No branches found.</li>
//         ) : (
//           filteredBranches.map((branch) => (
//             <li
//               key={branch._id}
//               className="flex justify-between items-center p-4 mb-2 rounded"
//             >
//               <span>{branch.name}</span>
//               <div className="flex space-x-2">
//                 <button onClick={() => handleEdit(branch)} aria-label="Edit">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V14"
//                     />
//                   </svg>
//                 </button>
//                 <button onClick={() => handleDelete(branch._id)} aria-label="Delete">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6 text-red-500 hover:text-red-600 transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 9.75v6.5M9 9.75v6.5M12 9.75v6.5M15 9.75v6.5M18 9.75v6.5M4.5 6h15a.75.75 0 0 1 .75.75v.75h-17v-.75A.75.75 0 0 1 4.5 6zm0 0h15m-9.75 6.75h-1.5M12 13.5h-1.5M6 6h15v12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V6z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>
//       {popupMessage && (
//         <Popup open={true} onClose={closePopup} closeOnDocumentClick>
//           <div className="w-full p-6 text-center">
//             <p className="text-primary mb-4">{popupMessage}</p>
//             <Button text="OK" onClick={closePopup} />
//           </div>
//         </Popup>
//       )}
//       {confirmationPopup && (
//         <Popup open={true} onClose={() => setConfirmationPopup(false)} closeOnDocumentClick>
//           <div className="w-full p-6 text-center">
//             <p className="text-primary mb-4">{popupMessage}</p>
//             <div className="flex justify-center gap-x-4">
//               <Button text="Confirm" onClick={confirmDelete} />
//               <Button text="Cancel" onClick={() => setConfirmationPopup(false)} />
//             </div>
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// };
const BranchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branches = [], loading, error } = useSelector((state) => state.admin); // Default to empty array if undefined
  const [searchQuery, setSearchQuery] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const { storeId } = useParams(); // Make sure to destructure storeId correctly

  useEffect(() => {
    console.log("Fetching branches...");
    dispatch(fetchBranches()).then((res) => console.log(res));
  }, [dispatch]);

  const handleEdit = (branch) => {
    navigate(`/dashboard/branches/edit/${branch._id}`);
  };

  const handleDelete = (id) => {
    setBranchToDelete(id);
    setPopupMessage("Are you sure you want to delete this branch?");
    setConfirmationPopup(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteBranch({ storeId, id: branchToDelete })).unwrap();
      setPopupMessage("Branch deleted successfully");
    } catch (error) {
      setPopupMessage("Failed to delete branch. Please try again.");
    }
    setConfirmationPopup(false);
  };

  const closePopup = () => {
    setPopupMessage(null);
    setBranchToDelete(null);
    if (!confirmationPopup) {
      dispatch(fetchBranches(storeId));
    }
  };

  // const filteredBranches = branches.filter((branch) =>
  //   branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredBranches = Array.isArray(branches)
  ? branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  return (
    <div className="p-6 m-2">
      {/* Search and Add Branch Button */}
      <div className="flex mb-6">
        <div className="flex bg-slate-300 items-center rounded-lg p-3 w-4/5">
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
            className="bg-slate-300 ml-2 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="text-primary font-bold bg-slate-300 rounded-lg p-3 ml-3 w-1/5"
          onClick={() => navigate(`/dashboard/manage-branch`)}
        >
          Add Branch
        </button>
      </div>

      <h1 className="text-3xl mb-4 font-bold text-primary">Branches</h1>
      <ul className="w-full divide-y divide-primary">
        {filteredBranches.length === 0 ? (
          <li className="p-4 text-center">No branches found.</li>
        ) : (
          filteredBranches.map((branch) => (
            <li
              key={branch._id}
              className="flex justify-between items-center p-4 mb-2 rounded"
            >
              <span>{branch.name}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(branch)} aria-label="Edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V14"
                    />
                  </svg>
                </button>
                <button onClick={() => handleDelete(branch._id)} aria-label="Delete">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-primary hover:text-highlight transition-colors duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* {popupMessage && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button text="OK" onClick={closePopup} />
          </div>
        </Popup>
      )}
      {confirmationPopup && (
        <Popup open={true} onClose={() => setConfirmationPopup(false)} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            {confirmationPopup ? (<div className="flex justify-center gap-x-4">
              <Button text="Confirm" onClick={confirmDelete} />
              <Button text="Cancel" onClick={() => setConfirmationPopup(false)} />
            </div>):(
              <Button text="OK" onClick={closePopup} />
            )}

          </div>
        </Popup>
      )} */}
         {confirmationPopup && (
        <Popup open={confirmationPopup} onClose={() => setConfirmationPopup(false)} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <div className="flex justify-center gap-x-4">
              <Button text="Confirm" onClick={confirmDelete} />
              <Button text="Cancel" onClick={() => setConfirmationPopup(false)} />
            </div>
          </div>
        </Popup>
      )}

      {/* Success/Failure Popup */}
      {!confirmationPopup && popupMessage && (
        <Popup open={true} onClose={closePopup} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button text="OK" onClick={closePopup} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default BranchList;
