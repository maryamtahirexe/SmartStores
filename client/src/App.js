import './App.css';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Dashboard from './pages/Dashboard/dashboard';
import PrivateRoute from './protectedRoutes/protectedRoutes';
import AuthCheck from './authCheck/AuthCheck';
import Owner from './pages/Owners/Owners';




// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Layout />}>
//         <Route index element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

function App() {
  return (
    <BrowserRouter>
    <AuthCheck />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<PrivateRoute element={<Dashboard />} />} />
          <Route  path="/dashboard/owner" element={<PrivateRoute element={<Owner />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
