"use client"
import OwnerDashboard from '@/app/(Dashboard)/owner-dashboard/page';
// pages/stores/[storeId].js
import { useRouter } from 'next/navigation';

const StorePage = () => {
  const router = useRouter();
  // const { storeId } = router.query;

  // You can use `storeId` to fetch data or conditionally render components

  return (
    <div>
      <OwnerDashboard />
      {/* Pass the storeId to your dashboard or use it as needed */}
    </div>
  );
};

export default StorePage;
