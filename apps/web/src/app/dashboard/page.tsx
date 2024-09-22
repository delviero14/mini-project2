
// "use client";

// import Dashboard from '@/components/Dashboard';
// import { base_url } from '@/lib/author'; // Pastikan path ini sesuai
// import { useEffect, useState } from 'react';

// const DashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null); // Ganti `any` dengan tipe yang sesuai
//   const [error, setError] = useState<string | null>(null); // Tipe state error

//   const fetchDashboardData = async () => {
//       try {
//           const token = localStorage.getItem('token'); // Ambil token dari localStorage
//           if (!token) {
//               throw new Error('Token is missing');
//           }

//           const res = await fetch(`${base_url}/dashboard`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`, // Gunakan token yang diambil
//               },
//           });

//           if (!res.ok) {
//               const errorData = await res.json();
//               throw new Error(errorData.msg || 'Failed to fetch data');
//           }

//           const data = await res.json();
//           setDashboardData(data); // Set data ke state
//       } catch (error) {
//           console.error('Error fetching dashboard data:', error);
//           setError(error instanceof Error ? error.message : 'Failed to load dashboard data'); // Atur error
//       }
//   };

//   useEffect(() => {
//       fetchDashboardData();
//   }, []);

//   return (
//     <div>
//       {error && <p>{error}</p>} {/* Tampilkan error jika ada */}
//       {dashboardData && <Dashboard data={dashboardData} />} {/* Gunakan dashboardData */}
//     </div>
//   );
// };

// export default DashboardPage;

// "use client"

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Dashboard from '@/components/Dashboard';
// import { base_url } from '@/lib/author';

// const DashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login'); // Jika token tidak ada, redirect ke halaman login
//         return;
//       }

//       const res = await fetch(`${base_url}/dashboard`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.msg || 'Failed to fetch data');
//       }

//       const data = await res.json();
//       setDashboardData(data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
//     }
//   };

//   // Fungsi handleLogout untuk menghapus token dan redirect
//   const handleLogout = () => {
//     // Hapus token dari localStorage
//     localStorage.removeItem('token');

//     // Redirect ke halaman login
//     router.push('/login');
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {dashboardData && <Dashboard data={dashboardData} />}
//       <button onClick={handleLogout}>Logout</button> {/* Tombol logout */}
//     </div>
//   );
// };

// export default DashboardPage;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Untuk redirect
import Dashboard from "@/components/Dashboard"; // Sesuaikan dengan komponen Dashboard
import { base_url } from "@/lib/author"; // Pastikan path sesuai

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<any>(null); // Menyimpan data dashboard
  const [error, setError] = useState<string | null>(null); // Menyimpan error jika ada
  const router = useRouter();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      router.push("/login"); // Jika token tidak ada, redirect ke halaman login
      return;
    }

    try {
      const res = await fetch(`${base_url}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token di header
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to fetch data");
      }

      const data = await res.json();
      setDashboardData(data); // Simpan data dashboard
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error instanceof Error ? error.message : "Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Ambil data dashboard saat komponen dimuat
  }, []);

  // Jika data atau error masih null, tampilkan loading atau error
  if (!dashboardData && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Dashboard data={dashboardData} />
    </div>
  );
};

export default DashboardPage;




