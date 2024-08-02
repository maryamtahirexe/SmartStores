// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import InputField from '../../components/inputField/inputField';
// import Button from '../../components/Button/button';
// import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
// import logo from '../../images/logo.png';
// import loginAdmin from '../../redux/slices/adminSlice/adminSlice.js';

// const Login = () => {
//   const [role, setRole] = useState('Admin');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Instantiate useNavigate
//   const { token, error, loading } = useSelector((state) => state.admin);

//   const toggleRole = () => {
//     setRole(role === 'Admin' ? 'Store Owner' : 'Admin');
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   await dispatch(loginAdmin({ email, password }))
//   //   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const resultAction = await dispatch(loginAdmin({ email, password }));
//       console.log('Dispatch result:', resultAction); // Log resultAction for debugging
//       if (loginAdmin.fulfilled.match(resultAction)) {
//         navigate('/dashboard');
//       } else {
//         console.error('Error payload:', resultAction.payload); // Log error payload
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };



//   return (
//     <div className="min-h-screen flex">
//       <div className="w-1/2 bg-primary flex flex-col justify-center items-center">
//         <img src={logo} alt="Logo" className="w-1/3 mb-4" />
//         <h1 className="text-3xl font-bold text-highlight">Welcome Back</h1>
//       </div>
//       <div className="w-1/2 bg-primary flex flex-col justify-center items-center">
//         <h2 className="text-2xl font-bold text-highlight mb-6">Login</h2>
//         <div className="mb-4">
//           <ToggleSwitch
//             isChecked={role === 'Store Owner'}
//             onToggle={toggleRole}
//             label1="Admin"
//             label2="Store Owner"
//           />
//         </div>
//         <form className="w-3/4 max-w-sm" onSubmit={handleSubmit}>
//           <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           {error && <p className="text-red-500">{error}</p>}
//           <div className="mt-6">
//             <Button text="Login" bgColor="#e5a830" textColor="#110626" />
//           </div>
//           {loading && <p>Loading...</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/Button/button';
import logo from '../../images/logo.png';
import { loginAdmin } from '../../redux/slices/adminSlice/adminSlice';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      alert(error);
      if (error === 'Invalid credentials') {
        setFormData({ email: '', password: '' });
      }
    }
  }, [error]);

  const toggleRole = () => {
    setRole(role === 'Admin' ? 'Store Owner' : 'Admin');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log('Dispatching loginAdmin with:', formData);
      const result = await dispatch(loginAdmin(formData));
      console.log('Dispatch result:', result);
      if (loginAdmin.fulfilled.match(result)) {
        console.log('Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.error('Error payload:', result.payload);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-primary flex flex-col justify-center items-center">
        <img src={logo} alt="Logo" className="w-1/3 mb-4" />
        <h1 className="text-3xl font-bold text-highlight">Welcome Back</h1>
      </div>
      <div className="w-1/2 bg-primary flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-highlight mb-6">Login</h2>
        <div className="mb-4">
          <ToggleSwitch
            isChecked={role === 'Store Owner'}
            onToggle={toggleRole}
            label1="Admin"
            label2="Store Owner"
          />
        </div>
        <form className="w-3/4 max-w-sm" onSubmit={handleSignIn}>
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-6">
            <Button
              text={loading ? 'Logging In...' : 'Login'}
              bgColor="#e5a830"
              textColor="#110626"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
