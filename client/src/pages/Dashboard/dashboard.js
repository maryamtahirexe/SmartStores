import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoresWithOwners } from '../../redux/slices/adminSlice/adminSlice';
import Card from '../../components/card/Card';


const Dashboard = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.admin.stores);
  const status = useSelector((state) => state.admin.storesStatus);
  const error = useSelector((state) => state.admin.storesError);

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

