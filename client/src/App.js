import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Dashboard from './pages/Dashboard/dashboard';
import PrivateRoute from './protectedRoutes/protectedRoutes';
import AuthCheck from './authCheck/AuthCheck';
import Owner from './pages/Owners/Owners';
import AddStore from './pages/Dashboard/addStore';
import EditStore from './pages/Dashboard/editStore';
import AddOwner from './pages/Owners/addOwner';
import Profile from './pages/profile/profile';
import UpdateEmail from './pages/profile/updateEmail';


function App() {
  return (
    <BrowserRouter>
    <AuthCheck />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<PrivateRoute element={<Dashboard />} />} />
          <Route  path="/dashboard/owner" element={<PrivateRoute element={<Owner />} />} />
          <Route  path="/dashboard/create-store" element={<PrivateRoute element={<AddStore />} />} />
          <Route  path="/dashboard/edit-store/:storeId" element={<PrivateRoute element={<EditStore />} />} />
          <Route  path="/dashboard/manage-owner" element={<PrivateRoute element={<AddOwner />} />} />
          <Route  path="/dashboard/profile" element={<PrivateRoute element={<Profile/>} />} />
          <Route path="/dashboard/profile/updateEmail" element={<PrivateRoute element={<UpdateEmail />} />} />
          <Route  path="/dashboard/manage-inventory" element={<PrivateRoute element={<InventoryForm/>} />} />
          <Route path="/dashboard/inventory" element={<PrivateRoute element={<InventoryList/>} />} />
          <Route path="/dashboard/branches" element={<PrivateRoute element={<BranchList/>} />} />
          <Route path="/dashboard/manage-branch" element={<PrivateRoute element={<AddBranch/>} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;