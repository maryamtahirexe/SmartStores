
// correct one 
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
  const token = Cookies.get('token') || localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

export default PrivateRoute;



// src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const token = Cookies.get('token') || localStorage.getItem('token');
  
//   return (
//     <Route
//       {...rest}
//       element={token ? Element : <Navigate to="/" />}
//     />
//   );
// };

// export default PrivateRoute;





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