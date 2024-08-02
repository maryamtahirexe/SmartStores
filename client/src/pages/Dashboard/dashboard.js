import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoresWithOwners } from '../../redux/slices/adminSlice/adminSlice';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../../redux/slices/auth/authSlice';



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stores = useSelector((state) => state.admin.stores);
  const status = useSelector((state) => state.admin.storesStatus);
  const error = useSelector((state) => state.admin.storesError);

  useEffect(() => {
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      navigate('/'); 
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStoresWithOwners());
    }
  }, [status, dispatch]);


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-900">Dashboard</h1>


      <p className="text-gray-700">Welcome to the dashboard!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {stores.map((store) => (
          <Card
            key={store.storeName}
            storeName={store.storeName}
            storeLocation={store.storeLocation}
            owners={store.owners}
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;

