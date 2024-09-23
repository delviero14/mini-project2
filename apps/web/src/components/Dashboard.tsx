// // src/components/Dashboard.tsx
// import React, { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
// }

// const Dashboard: React.FC = () => {
//   const [data, setData] = useState<DashboardData>({ message: '' });

//   useEffect(() => {
//     fetch('http://localhost:3000/dashboard')
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>{data.message}</p>
//     </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.tsx




// import React, { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
//   postCount: number;
// }

// const Dashboard: React.FC = () => {
//   const [data, setData] = useState<DashboardData>({ message: '', postCount: 0 });

//   useEffect(() => {
//     fetch('http://localhost:3000/dashboard')
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>{data.message}</p>
//       <p>Number of blog posts: {data.postCount}</p>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
//   postCount: number;
//   blogs: {
//     id: number;
//     title: string;
//     slug: string;
//     category: string;
//     content: string;
//     createdAt: string;
//     updatedAt: string;
//   }[];
// }

// const Dashboard: React.FC = () => {
//   const [data, setData] = useState<DashboardData>({
//     message: '',
//     postCount: 0,
//     blogs: []
//   });

//   useEffect(() => {
//     fetch('http://localhost:3000/api/dashboard')
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>{data.message}</p>
//       <p>Number of blog posts: {data.postCount}</p>
//       <ul>
//         {data.blogs.map((blog) => (
//           <li key={blog.id}>
//             <h2>{blog.title}</h2>
//             <p>Slug: {blog.slug}</p>
//             <p>Category: {blog.category}</p>
//             <p>Content: {blog.content}</p>
//             <p>Created at: {blog.createdAt}</p>
//             <p>Updated at: {blog.updatedAt}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
//   postCount: number;
//   blogs: {
//     id: number;
//     title: string;
//     slug: string;
//     category: string;
//     content: string;
//     createdAt: string;
//     updatedAt: string;
//   }[];
// }

// const Dashboard: React.FC = () => {
//   const [data, setData] = useState<DashboardData>({
//     message: '',
//     postCount: 0,
//     blogs: []
//   });
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/dashboard')
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error(response.statusText);
//         }
//       })
//       .then((data) => setData(data))
//       .catch((error) => setError(error.message));
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <>
//           <p>{data.message}</p>
//           <p>Number of blog posts: {data.postCount}</p>
//           <ul>
//             {data.blogs.map((blog) => (
//               <li key={blog.id}>
//                 <h2>{blog.title}</h2>
//                 <p>Slug: {blog.slug}</p>
//                 <p>Category: {blog.category}</p>
//                 <p>Content: {blog.content}</p>
//                 <p>Created at: {blog.createdAt}</p>
//                 <p>Updated at: {blog.updatedAt}</p>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// import axios from 'axios';
// import { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
//   totalCount: number;
//   blogs: {
//     id: number;
//     title: string;
//     author: {
//       name: string;
//     };
//     createdAt: string;
//   }[];
// }

// function Dashboard() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axios.get('/api/dashboard')
//       .then(response => {
//         setData(response.data as DashboardData);
//       })
//       .catch((error: any) => {
//         if (error.response && error.response.status === 401) {
//           setError(error.response.data.error);
//         } else {
//           setError('An unexpected error occurred');
//         }
//       });
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{data.message}</h1>
//       <p>Total Postingan: {data.totalCount}</p>
//       <ul>
//         {data.blogs.map(blog => (
//           <li key={blog.id}>
//             <h2>{blog.title}</h2>
//             <p>Pembuat: {blog.author.name}</p>
//             <p>Tanggal Pembuatan: {blog.createdAt}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;

// import axios from 'axios';
// import { useState, useEffect } from 'react';

// interface DashboardData {
//   message: string;
//   totalCount: number;
//   blogs: {
//     id: number;
//     title: string;
//     author: {
//       name: string;
//     };
//     createdAt: string;
//   }[];
// }

// function Dashboard() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/dashboard')
//       .then(response => {
//         setData(response.data as DashboardData);
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!data) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       <h1>{data.message}</h1>
//       <p>Total Postingan: {data.totalCount}</p>
//       <ul>
//         {data.blogs.map(blog => (
//           <li key={blog.id}>
//             <h2>{blog.title}</h2>
//             <p>Pembuat: {blog.author.name}</p>
//             <p>Tanggal Pembuatan: {blog.createdAt}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;

import { GetServerSideProps } from 'next';

type Author = {
  name: string;
};

type Blog = {
  id: number;
  title: string;
  category: string;
  author: Author;
  createdAt: string;
};

type DashboardProps = {
  message: string;
  totalCount: number;
  blogs: Blog[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:8000/api/dashboard');
  const data: DashboardProps = await res.json(); // Parsing data from the API

  return {
    props: {
      data,
    },
  };
};

const Dashboard = ({ data }: { data: DashboardProps }) => {
  return (
    <div className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{data.message}</h1>
        <p className="mb-4 text-gray-600">Total Blogs: <span className="font-semibold text-gray-800">{data.totalCount}</span></p>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="py-3 px-6 border-b border-gray-300 text-left">Title</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left">Category</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left">Author</th>
                        <th className="py-3 px-6 border-b border-gray-300 text-left">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-100 transition duration-200">
                            <td className="py-4 px-6 border-b border-gray-300">{blog.title}</td>
                            <td className="py-4 px-6 border-b border-gray-300">{blog.category}</td>
                            <td className="py-4 px-6 border-b border-gray-300">{blog.author.name}</td>
                            <td className="py-4 px-6 border-b border-gray-300">{new Date(blog.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default Dashboard;


