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

import axios from 'axios';
import { useState, useEffect } from 'react';

interface DashboardData {
  message: string;
  totalCount: number;
  blogs: {
    id: number;
    title: string;
    author: {
      name: string;
    };
    createdAt: string;
  }[];
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/dashboard')
      .then(response => {
        setData(response.data as DashboardData);
        setLoading(false);
      })
      .catch((error: any) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
      <p>Total Postingan: {data.totalCount}</p>
      <ul>
        {data.blogs.map(blog => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>Pembuat: {blog.author.name}</p>
            <p>Tanggal Pembuatan: {blog.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;