"use client";

import { useEffect, useState } from "react";
import { CardBlog } from "@/components/card";
import Wrapper from "@/components/wrapper";
import { getBlogs } from "@/lib/blog";
import SearchBlog from "./search/page";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const { blogs } = await getBlogs();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const filterBlogs = (category: string) => {
    const filtered = blogs.filter((item: any) => item.category === category);
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const filterByLocation = (location: string) => {
    setLocationFilter(location);
    setCurrentPage(1);
  };

  const showAllBlogs = () => {
    setFilteredBlogs([]);
    setLocationFilter("");
    setCurrentPage(1);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = (filteredBlogs.length > 0 ? filteredBlogs : blogs)
    .filter((item: any) => !locationFilter || item.location === locationFilter)
    .slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil((currentBlogs.length) / blogsPerPage);

  return (
    <Wrapper>
      <SearchBlog />
      <i className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        <button onClick={() => filterBlogs("Health")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Health
        </button>
        <button onClick={() => filterBlogs("Tech")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Tech
        </button>
        <button onClick={() => filterBlogs("Science")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Science
        </button>
        <button onClick={() => filterBlogs("Sport")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sport
        </button>
        <button onClick={showAllBlogs} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Show All
        </button>
        <button onClick={() => filterByLocation("New York")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"> New York
        </button>
        <button onClick={() => filterByLocation("Los Angeles")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"> Los Angeles
        </button>
        {
          currentBlogs.map((items: any) => {
            return (
              <CardBlog 
                key={items.id}
                title={items.title} 
                slug={items.slug} 
                image={items.image}
                avatar={items.author.avatar}
                location={items.location}
                content={items.content}
                price={items.price}
                type={items.type}
              />
            )
          })
        }
      </i>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </Wrapper>
  );
}
