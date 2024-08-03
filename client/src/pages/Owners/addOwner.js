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
// import { useNavigate } from "react-router-dom";

// const AddOwner = () => {
//   const dispatch = useDispatch();
//   const { owners, loading, error } = useSelector((state) => state.owners);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [editOwner, setEditOwner] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchOwners());
//   }, [dispatch]);

//   //   const handleChange = (e) => {
//   //     setFormData({ ...formData, [e.target.name]: e.target.value });
//   //   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log("Change detected:", name, value); // Debugging line
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     if (editOwner) {
//       dispatch(updateOwner({ id: editOwner._id, ...formData }));
//       setEditOwner(null);
//       navigate("/dashboard/owner");
//     } else {
//       dispatch(createOwner(formData));
//       navigate("/dashboard/owner");
//     }
//     setFormData({ name: "", email: "", password: "" });
//   };

//   const handleEdit = (owner) => {
//     setEditOwner(owner);
//     setFormData({ name: owner.name, email: owner.email, password: "" });
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteOwner(id));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-primary rounded-lg shadow-lg">
//         <h1 className="text-3xl text-highlight mb-6 text-center">Add Owner</h1>
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


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwners,
  createOwner,
  deleteOwner,
  updateOwner,
} from "../../redux/slices/ownerSlice/ownerSlice";
import InputField from "../../components/inputField/inputField";
import Button from "../../components/Button/button";
import { useNavigate, useLocation } from "react-router-dom";

const AddOwner = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const editOwner = location.state?.owner; // Receive owner data from navigation state

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editOwner) {
      dispatch(updateOwner({ id: editOwner._id, ...formData }));
      navigate("/dashboard/owner");
    } else {
      dispatch(createOwner(formData));
      navigate("/dashboard/owner");
    }
    setFormData({ name: "", email: "", password: "" });
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
        </form>
      </div>
    </div>
  );
};

export default AddOwner;
