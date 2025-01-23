import React from 'react';
import Link from 'next/link';
import Pagination from './pagination';
import prisma from '@/libs/db';
import Image from 'next/image';
import { notFound } from 'next/navigation'; // For handling 404 pages
import Searchbar from './Searchbar';
import BlogCategory from './BlogCategory';
import FeaturedProducts from './FeaturedProducts';

const ITEMS_PER_PAGE = 3;

// Function to fetch blogs and implement server-side pagination
const fetchBlogs = async (page) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const blogs = await prisma.blogs.findMany({
    skip: skip,
    take: ITEMS_PER_PAGE,
    orderBy: { date: 'desc' },
  });

  // Count the total number of blogs to calculate total pages
  const totalBlogs = await prisma.blogs.count();
  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);

  return { blogs, totalPages };
};

const Blog = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1; // Get the current page from the searchParams

  if (page < 1) {
    notFound(); // Handle invalid page
  }

  const { blogs, totalPages } = await fetchBlogs(page); // Fetch paginated data

  return (
    <div className="bg-black text-yellow-600 pb-10">
      {/* Header Section */}
      <div className="relative h-32 sm:h-40 bg-[url('https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648399/StreetPulse/HomepageImages%20and%20headers/about-1_dpbx6z.avif')] bg-right bg-cover text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">BLOGS</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-6 sm:p-10 md:p-20">
        {/* Blog Posts */}
        <div className="w-full lg:w-2/3">
          {blogs.map((item) => (
            <div key={item.id} className="mb-10">
              <div className="border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer w-[90%] aspect-[2/1]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={200}
                  layout="responsive"
                  className="object-cover transition-transform ease-linear duration-300 hover:scale-110"
                />
              </div>
              <div className="mt-4 w-[90%]">
                <p className="text-gray-500 text-sm sm:text-base">
                  By {item.name} on {new Date(item.date).toLocaleDateString()}
                </p>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold hover:text-yellow-400 cursor-pointer">
                  <Link href={`/blogs/${item.id}`} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 text-white text-sm sm:text-base">
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

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-10">
          <Searchbar />
          <div className="mt-10">
            <BlogCategory />
            <FeaturedProducts />
            <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-5">Tags</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">Men</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">Women</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">Fashion</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">LifeStyle</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">Denim</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">StreetStyle</button>
              <button className="border-2 border-yellow-700 rounded-3xl p-2 sm:p-3 text-sm sm:text-base">Crafts</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Blog;