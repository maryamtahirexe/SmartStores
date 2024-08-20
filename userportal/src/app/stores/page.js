// "use client";
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { selectOwnerStores, fetchStores } from '@/redux/slices/ownerSlice/ownerSlice';

// export default function Store() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { stores, loading, error } = useSelector(selectOwnerStores);

//   useEffect(() => {
//     // Fetch stores when the component mounts
//     dispatch(fetchStores());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading stores: {error}</p>;

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Stores</h1>
//       {stores.length > 0 ? (
//         <ul className="list-disc pl-6">
//           {stores.map(store => (
//             <li key={store._id} className="mb-2">
//               <button 
//                 className="text-blue-500 hover:underline"
//                 onClick={() => router.push(`/store/${store._id}`)}
//               >
//                 {store.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No stores found.</p>
//       )}
//     </div>
//   );
// }


// // src/pages/store.js
// "use client";
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { selectOwnerStores, fetchStores } from '@/redux/slices/ownerSlice/ownerSlice';

// export default function Store() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { stores, error } = useSelector(selectOwnerStores);

//   // useEffect(() => {
//   //   // Dispatch fetchStores only if stores are empty
//   //   if (stores.length === 0) {
//   //     dispatch(fetchStores());
//   //     console.log("No stores found")
//   //   }
//   // }, [dispatch, stores]);

//   useEffect(() => {
//     if (stores.length === 0) {
//       dispatch(fetchStores());
//     }
//   }, [dispatch, stores]);
  

//   if (!stores) return <p>Loading...</p>; // Adjusted to handle initial state
//   if (error) return <p>Error loading stores: {error}</p>;

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Stores</h1>
//       {stores.length > 0 ? (
//         <ul className="list-disc pl-6">
//           {stores.map(store => (
//             <li key={store._id} className="mb-2">
//               <button 
//                 className="text-blue-500 hover:underline"
//                 onClick={() => router.push(`/store/${store._id}`)}
//               >
//                 {store.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No stores found.</p>
//       )}
//     </div>
//   );
// }


// src/pages/store.js
// "use client";
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { selectOwnerStores, fetchStores } from '@/redux/slices/ownerSlice/ownerSlice';

// export default function Store() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   // const { stores, error } = useSelector(selectOwnerStores);

//   useEffect(() => {
//     const { stores, error } = useSelector(selectOwnerStores);
//     // Dispatch fetchStores only if stores are empty
//     if (stores.length === 0) {
//       console.log('No stores Found')
//     }
//   }, [dispatch, stores]);

//   if (!stores) return <p>Loading...</p>; // Adjusted to handle initial state
//   if (error) return <p>Error loading stores: {error}</p>;

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Stores</h1>
//       {stores.length > 0 ? (
//         <ul className="list-disc pl-6">
//           {stores.map(store => (
//             <li key={store._id} className="mb-2">
//               <button 
//                 className="text-blue-500 hover:underline"
//                 onClick={() => router.push(`/stores/${store._id}`)}
//               >
//                 {store.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No stores found.</p>
//       )}
//     </div>
//   );
// }

"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectOwnerStores } from '@/redux/slices/ownerSlice/ownerSlice';

export default function Store() {
  const router = useRouter();
  const { stores, loading, error } = useSelector(selectOwnerStores);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading stores: {error}</p>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Your Stores</h1>
      {stores.length > 0 ? (
        <ul className="list-disc pl-6">
          {stores.map(store => (
            <li key={store._id} className="mb-2">
              <button 
                className="text-blue-500 hover:underline"
                onClick={() => router.push(`/stores/${store._id}/analytics`)}
              >
                {store.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stores found.</p>
      )}
    </div>
  );
}
