"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputField from '@/components/inputField/page';
import logo from "@/assets/images/logo.png"
import { setEmail, setPassword, setRole, logout, selectUser } from "@/redux/slices/userSlice/userSlice"; // Adjust the import path
import { loginOwner } from '@/redux/slices/ownerSlice/ownerSlice';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password, role, redirectTo, loading, error } = useSelector(selectUser);

  const onChange = (e) => {
    if (e.target.name === 'email') {
      dispatch(setEmail(e.target.value));
    } else if (e.target.name === 'password') {
      dispatch(setPassword(e.target.value));
    }
  };

  const onRoleChange = () => {
    dispatch(setRole(role === 'owner' ? 'cashier' : 'owner'));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (role === "owner") {
      console.log("role ?", role)
      const result = await dispatch(loginOwner({ email, password }));
      if (loginOwner.fulfilled.match(result)) {
        console.log("Owner login successful");
        router.push('/stores'); // Navigate to the /stores page
      } else {
        console.log("Owner login failed");
      }
    } else if (role === "cashier") {
      // await dispatch(loginCashier({ email, password}));
      console.log("Cashier login");
    }

    
  };
  

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
      dispatch(logout()); // Optional: clear user data after redirection
    }
  }, [redirectTo, router, dispatch]);

  return (
    <div className="bg-login-bg min-h-screen flex bg-primary ">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <Image src={logo} alt="Logo" className="w-1/3 mb-4" />
          <h1 className="text-3xl font-bold text-highlight">USER PORTAL</h1>
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
              name="email"
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
              name="password"
            />
            <div className="mt-6">
              <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
                Login
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}





// "use client";
// import { useState } from 'react';
// // import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import logo from "@/assets/images/logo.png"
// import Image from 'next/image';
// import InputField from '@/components/inputField/page';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'owner',
//   });

//   const router = useRouter();

//   const { email, password, role } = formData;

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onRoleChange = () => {
//     setFormData({ ...formData, role: role === 'owner' ? 'cashier' : 'owner' });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const res = await axios.post('/api/auth/login', formData);
//       // console.log(res.data);

//       if (role === 'owner') {
//         router.push('/login/ownerDashboard'); // Redirect to ownerDashboard if role is 'owner'
//       } else if (role === 'cashier') {
//         router.push('/login/cashierDashboard'); // Redirect to cashierDashboard if role is 'cashier'
//       }
//     } catch (err) {
//       console.error(err.response.data.msg);
//     }
//   };

//   return (
//     <div className="bg-login-bg min-h-screen flex">
//         <div className="flex flex-col lg:flex-row w-full">
//           <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
//             <Image src={logo} alt="Logo" className="w-1/3 mb-4" />
//             <h1 className="text-3xl font-bold text-highlight">USER PORTAL</h1>
//           </div>
//           <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
//             <h2 className="text-2xl text-highlight mb-6">Welcome Back!</h2>
//             <form className="w-full max-w-sm" onSubmit={onSubmit}>
//               <div className="flex items-center mb-6">
//                 <span className="text-highlight mr-2">Owner</span>
//                 <label className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     className="toggle-checkbox"
//                     checked={role === 'cashier'}
//                     onChange={onRoleChange}
//                   />
//                   <span className="toggle-label bg-highlight rounded-full w-14 h-7 flex items-center px-1">
//                     <span className={`dot bg-white w-5 h-5 rounded-full shadow-md transform ${role === 'cashier' ? 'translate-x-7' : ''}`}></span>
//                   </span>
//                 </label>
//                 <span className="text-highlight ml-2">Cashier</span>
//               </div>
//               <InputField
//                 label="Email"
//                 type="email"
//                 id="email"
//                 placeholder="Enter Email Address"
//                 value={email}
//                 onChange={onChange}
//                 name="email"  // Add the name prop
//               />
//               <InputField
//                 label="Password"
//                 type="password"
//                 id="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={onChange}
//                 name="password"  // Add the name prop
//               />
//               <div className="mt-6">
//                 <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }


