import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwners, createOwner, deleteOwner, updateOwner } from '../../redux/slices/ownerSlice/ownerSlice';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/Button/button';

const Owner = () => {
  const dispatch = useDispatch();
  const { owners, loading, error } = useSelector((state) => state.owners);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editOwner, setEditOwner] = useState(null);

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Change detected:', name, value); // Debugging line
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (editOwner) {
      dispatch(updateOwner({ id: editOwner._id, ...formData }));
      setEditOwner(null);
    } else {
      dispatch(createOwner(formData));
    }
    setFormData({ name: '', email: '', password: '' });
  };

  const handleEdit = (owner) => {
    setEditOwner(owner);
    setFormData({ name: owner.name, email: owner.email, password: '' });
  };

  const handleDelete = (id) => {
    dispatch(deleteOwner(id));
  };



return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Manage Owners</h2>
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
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-6 w-full">
          {owners.map((owner) => (
            <li key={owner._id} className="flex justify-between items-center bg-gray-200 p-4 mb-2 rounded">
              <span>{owner.name}</span>
              <div>
                <Button text="Edit" onClick={() => handleEdit(owner)} />
                <Button text="Delete" onClick={() => handleDelete(owner._id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Owner;