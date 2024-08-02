import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check token in localStorage

  return (
    <Route
      {...rest}
      element={token ? Component : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children }) => {
//   const authState = useSelector((state) => state.auth); // Check the whole state
//   console.log('Auth State:', authState);
//   const token = authState.token;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   return token ? children : null;
// };

// export default ProtectedRoute;