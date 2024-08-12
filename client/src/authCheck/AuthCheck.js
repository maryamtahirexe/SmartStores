//HURAHHHHHHHHHHHHHHHHHHHHHHHHH  / // src/components/AuthCheck.js
// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../redux/slices/auth/authSlice';
// import Cookies from 'js-cookie';

// const AuthCheck = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = Cookies.get('token') || localStorage.getItem('token');
//     if (!token) {
//       dispatch(logout());
//       navigate('/');
//     }
//   }, [dispatch,navigate]);

//   return null;
// };

// export default AuthCheck;
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/auth/authSlice';
import Cookies from 'js-cookie';

const AuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('token') || localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
        navigate('/'); // Redirect to login page hi my name is jhadsfka
      }
    };

    checkToken(); // Initial check

    // Set up an interval to check token periodically
    const intervalId = setInterval(checkToken, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [dispatch, navigate]);

  return null;
};

export default AuthCheck;

