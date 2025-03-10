"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Blogdisplay = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs.length) {
    return <div className="text-center bg-black text-yellow-500 text-lg p-5">Loading Blogs...</div>;
  }

  return (
    <>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold pt-20 text-center bg-black text-yellow-500">
        Our Blogs
      </h3>
      <div className="bg-black flex flex-col sm:flex-row flex-wrap justify-center gap-6  sm:p-10 md:p-10">
        {blogs.map((item) => (
          <div key={item.id} className="w-full sm:w-[45%] lg:w-[30%]">
            <div className="pt-10 sm:pt-16">
              <div className="border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={250}
                  layout="responsive"
                  className="object-top object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg"
                />
              </div>
            </div>
            <div>
              <p className="pt-3 pl-3 text-gray-500 text-sm sm:text-base">
                By {item.name} on {new Date(item.date).toLocaleDateString()}
              </p>
              <h2 className="pt-3 pl-3 text-xl sm:text-2xl font-bold text-yellow-400 cursor-pointer">
                <Link
                  href={`/blogs/${item.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.title}
                </Link>
              </h2>
              <p className="pt-3 pl-3 text-white text-sm sm:text-base">
                {item.content.slice(0, 310)}...
                <Link
                  href={`/blogs/${item.id}`}
                  className="text-blue-500 underline hover:text-blue-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogdisplay;