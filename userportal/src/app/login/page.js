"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import logo from "@/assets/images/logo.png"
import Image from 'next/image';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'owner', 
  });
  
  const router = useRouter();

  const { email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRoleChange = () => {
    setFormData({ ...formData, role: role === 'owner' ? 'cashier' : 'owner' });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('/api/auth/login', formData);
      // console.log(res.data);

      if (role === 'owner') {
        router.push('/login/ownerDashboard'); // Redirect to ownerDashboard if role is 'owner'
      } else if (role === 'cashier') {
        router.push('/login/cashierDashboard'); // Redirect to cashierDashboard if role is 'cashier'
      }
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="bg-login-bg min-h-screen flex">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <Image src={logo} alt="Logo" className="w-1/3 mb-4" />
          <h1 className="text-3xl font-bold text-highlight">TEXINITY TECHNOLOGIES</h1>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <h2 className="text-2xl text-highlight mb-6">Welcome Back!</h2>
          <form className="w-full max-w-sm" onSubmit={onSubmit}>
            <div className="flex items-center mb-6">
              <span className="text-highlight mr-2">Owner</span>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={role === 'cashier'}
                  onChange={onRoleChange}
                />
                <span className="toggle-label bg-highlight rounded-full w-14 h-7 flex items-center px-1">
                  <span className={`dot bg-white w-5 h-5 rounded-full shadow-md transform ${role === 'cashier' ? 'translate-x-7' : ''}`}></span>
                </span>
              </label>
              <span className="text-highlight ml-2">Cashier</span>
            </div>
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={onChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
              required
            />
            <div className="mt-6">
              <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, id, placeholder, value, onChange, required }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-highlight rounded bg-transparent text-white placeholder-highlight"
      />
    </div>
  );
}



// "use client";
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import InputField from '../components/inputField';  // Correct path
// import Button from '../components/button';  // Correct path
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import logo from '../../assets/images/logo.png';  // Correct path
// import { loginOwner, setOwnerError } from '../../redux/slices/ownerSlice/page';  // Correct path
// import { loginCashier, setCashierError } from '../../redux/slices/cashierSlice/page';  // Correct path

// const Login = () => {
//   const [role, setRole] = useState('Owner');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [popupMessage, setPopupMessage] = useState(null);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { error: ownerError } = useSelector((state) => state.owner);
//   const { error: cashierError } = useSelector((state) => state.cashier);

//   useEffect(() => {
//     if (role === 'Owner' && ownerError) {
//       setPopupMessage(ownerError);
//     }
//     if (role === 'Cashier' && cashierError) {
//       setPopupMessage(cashierError);
//     }
//     if (ownerError === 'Invalid credentials' || cashierError === 'Invalid credentials') {
//       setFormData({ email: '', password: '' });
//     }
//   }, [ownerError, cashierError, role]);

//   const toggleRole = () => {
//     setRole(role === 'Owner' ? 'Cashier' : 'Owner');
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       if (role === 'Owner') {
//         const result = await dispatch(loginOwner(formData));
//         if (loginOwner.fulfilled.match(result)) {
//           router.push('/dashboard');
//         } else {
//           setPopupMessage('Login failed. Please check your credentials.');
//         }
//       } else {
//         const result = await dispatch(loginCashier(formData));
//         if (loginCashier.fulfilled.match(result)) {
//           router.push('/dashboard');
//         } else {
//           setPopupMessage('Login failed. Please check your credentials.');
//         }
//       }
//     } catch (error) {
//       setPopupMessage('An unexpected error occurred.');
//     }
//   };

//   const handlePopupClose = () => setPopupMessage(null);

//   return (
//     <div className="bg-login-bg min-h-screen flex">
//       <div className="flex flex-col lg:flex-row w-full">
//         <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
//           <Image src={logo} alt="Logo" width={150} height={150} className="w-1/3 mb-4" />
//           <h1 className="text-3xl font-bold text-highlight">TEXINITY TECHNOLOGIES</h1>
//         </div>
//         <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
//           <h2 className="text-2xl text-highlight mb-6">Welcome Back!</h2>
//           <form className="w-full max-w-sm" onSubmit={handleSignIn}>
//             <div className="flex items-center mb-6">
//               <span className="text-highlight mr-2">Owner</span>
//               <label className="inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="toggle-checkbox"
//                   checked={role === 'Cashier'}
//                   onChange={toggleRole}
//                 />
//                 <span className="toggle-label bg-highlight rounded-full w-14 h-7 flex items-center px-1">
//                   <span className={`dot bg-white w-5 h-5 rounded-full shadow-md transform ${role === 'Cashier' ? 'translate-x-7' : ''}`}></span>
//                 </span>
//               </label>
//               <span className="text-highlight ml-2">Cashier</span>
//             </div>
//             <InputField
//               label="Email"
//               type="email"
//               id="email"
//               placeholder="Enter Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               name="email"
//               required
//             />
//             <InputField
//               label="Password"
//               type="password"
//               id="password"
//               placeholder="Enter Password"
//               value={formData.password}
//               onChange={handleChange}
//               name="password"
//               required
//             />
//             <div className="mt-6">
//               <Button text='Login' />
//             </div>
//           </form>
//         </div>
//       </div>
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

// export default Login;
