// app/dashboard/layout.js
// import React from 'react';
// import Sidebar from '@/components/sidebar/SideBar';

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="grid grid-cols-6 min-h-screen">
//       <div className="col-span-1">
//         <Sidebar />
//       </div>
//       <main className="col-span-5 ml-6">
//         {children}
//       </main>
//     </div>
//   );
// }


// app/dashboard/layout.js
// 'use client'
// import React from 'react';
// import Sidebar from '@/components/sidebar/SideBar';
// import { useRouter } from 'next/navigation';

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const { storeId } = router.query; // Get storeId from router.query

//   return (
//     <div className="grid grid-cols-6 min-h-screen">
//       <div className="col-span-1">
//         <Sidebar storeId={storeId} />
//       </div>
//       <main className="col-span-5 ml-6">
//         {children}
//       </main>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from 'react';
// import Sidebar from '@/components/sidebar/SideBar';
// import { useRouter } from 'next/navigation';

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const [storeId, setStoreId] = useState(null);

//   useEffect(() => {
//     if (router.query.storeId) {
//       setStoreId(router.query.storeId);
//       console.log("storeID?, router.query.storeId")
//     }
//   }, [router.query.storeId]);

//   if (!storeId) return <div>Loading...</div>; // Optionally show a loading state

//   return (
//     <div className="grid grid-cols-6 min-h-screen">
//       <div className="col-span-1">
//         <Sidebar storeId={storeId} />
//       </div>
//       <main className="col-span-5 ml-6">
//         {children}
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar/SideBar';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    // Extract storeId from the pathname
    const match = pathname.match(/stores\/([^/]+)\//);
    if (match) {
      const extractedStoreId = match[1];
      setStoreId(extractedStoreId);
      console.log("Extracted storeId:", extractedStoreId);
    }
  }, [pathname]);

  if (!storeId) return <div>Loading...</div>; // Optionally show a loading state

  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="col-span-1">
        <Sidebar storeId={storeId} />
      </div>
      <main className="col-span-5 ml-6">
        {children}
      </main>
    </div>
  );
}
