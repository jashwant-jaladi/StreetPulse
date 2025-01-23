"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Searchbar from '../../Searchbar';
import BlogCategory from '../../BlogCategory';
import Link from 'next/link';
import Image from 'next/image';

const Category = ({ params }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract the category from params.categories
  const category = params?.categories;

  useEffect(() => {
    fetch('/api/allBlogs')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs);
        setFilteredBlogs(category ? data.blogs.filter((blog) => blog.category === category) : data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div className="text-yellow-400">Loading...</div>;
  }

  return (
    <div className="bg-black text-yellow-600 pb-10">
      <h3 className="text-2xl font-bold p-5">
        {category ? `Blogs in "${category}" Category` : "All Blogs"}
      </h3>

      <div className="flex flex-col lg:flex-row justify-around gap-8 p-5">
        {/* Left side: Blogs Section */}
        <div className="w-full lg:w-1/2">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => (
              <div key={item.id} className="bg-black rounded-lg p-4 border-2 border-yellow-600 mb-6">
                <div className="border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm">By {item.name} on {new Date(item.date).toLocaleDateString()}</p>
                  <h2 className="text-2xl font-bold hover:text-yellow-400 mt-2 cursor-pointer">
                    <Link href={`/blogs/${item.id}`} rel="noopener noreferrer" target="_blank">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-white mt-2">
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
            ))
          ) : (
            <p className="text-yellow-400">No blogs found.</p>
          )}
        </div>

        {/* Right side: Searchbar, Categories, and Tags */}
        <div className="w-full lg:w-[20%]">
          <Searchbar className="w-full" />

          <div className="mt-10">
            <BlogCategory />
            <h3 className="text-2xl lg:text-3xl font-bold p-5 mt-10">Featured Products</h3>
            <h3 className="text-2xl lg:text-3xl font-bold p-5 mt-10">Tags</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              <button className="border-2 border-yellow-700 rounded-3xl p-3">Men</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">Women</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">Fashion</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">LifeStyle</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">Denim</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">StreetStyle</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-3">Crafts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;