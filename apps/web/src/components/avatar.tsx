'use client'

import { useRouter, usePathname } from 'next/navigation';
import { deleteToken, getToken } from "@/lib/server"
import { useAppSelector } from "@/redux/hook"
import Link from "next/link"
import { useEffect, useState } from "react"


  
    // Fungsi untuk mengambil token dan memeriksa apakah ada token di localStorage
    export default function AvatarComp() {
        const [token, setToken] = useState<string | null>(null);
        const router = useRouter(); // Inisialisasi router
        const pathname = usePathname(); // Mendapatkan path saat ini
      
        const getData = async () => {
          const res = await getToken(); // Mengambil token dari localStorage
          if (!res) {
            const publicRoutes = ['/login', '/register', '/']; // Daftar rute yang tidak membutuhkan login
      
            // Jika pengguna mencoba mengakses halaman selain publicRoutes
            if (!publicRoutes.includes(pathname)) {
              router.push('/login'); // Redirect ke login jika di luar rute publik
            }
          } else {
            setToken(res); // Jika token ada, simpan di state
          }
        };
  
    // Fungsi untuk logout
    const onLogout = async () => {
      await deleteToken(); // Menghapus token dari localStorage
      setToken(''); // Mengosongkan state token
      router.push('/login'); // Redirect ke halaman login
    };
  
    const author = useAppSelector((state) => state.author); // Mengambil state author (pastikan hook ini sudah benar)

    useEffect(() => {
        getData();
      }, [pathname]);

    return (
        <div className="flex items-center gap-4">
          {
            token ? (
              // Tampilkan avatar dan tombol dashboard jika sudah login
              <>
                <div className="flex gap-2 cursor-pointer" onClick={onLogout}>
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div>{author.name}</div>
                    <div className="text-[14px]">{author.email}</div>
                  </div>
                </div>
                <Link href={'/dashboard'} className="dark:text-white">Dashboard</Link>
              </>
            ) : (
              // Tampilkan tombol register dan login jika belum login
              <>
                <Link href={'/register'} className="dark:text-white">Register</Link>
                <Link href={'/login'} className="dark:text-white">Login</Link>
              </>
            )
          }
        </div>
      );
}

// 'use client';


// // Ganti ini dengan lokasi function kamu
// import { useRouter } from 'next/navigation';
// import { deleteToken, getToken } from "@/lib/server"
// import { useAppSelector } from "@/redux/hook"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// export default function AvatarComp() {
//     const [token, setToken] = useState<string | null>(null); // Menyimpan token
//     const router = useRouter();
  
//     const getData = async () => {
//       const res = await getToken(); // Ambil token dari localStorage
//       setToken(res ?? null); // Set token atau null jika tidak ada
//     };
  
//     const onLogout = async () => {
//       await deleteToken(); // Hapus token dari localStorage
//       setToken(null); // Set token menjadi null setelah logout
//       router.push("/login"); // Redirect ke halaman login
//     };
  
//     const author = useAppSelector((state) => state.author); // Ambil data author dari state (jika menggunakan redux)
  
//     useEffect(() => {
//       getData(); // Ambil data token saat komponen dimuat
//     }, []);
  
//     return (
//       <div>
//         {token ? (
//           <>
//             <p>Author: {author?.name}</p> {/* Tampilkan nama author jika login */}
//             <button onClick={onLogout}>Logout</button> {/* Tombol logout */}
//           </>
//         ) : (
//           <p>Guest</p> // Tampilkan status Guest jika belum login
//         )}
//       </div>
//     );
//   }
