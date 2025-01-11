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
      <div className="bg-[url('/blog/f7.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400">
        <h1>BLOGS</h1>
      </div>

      <div className="flex flex-row">
        <div>
          {blogs.map((item) => (
            <div key={item.id} className="w-[50vw] ml-20">
              <div className="pt-20">
                <div className="border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-[700px]">
                <p className="pt-3 pl-3 text-gray-500">By {item.name} on {new Date(item.date).toLocaleDateString()}</p>
                <h2 className="pt-3 pl-3 text-2xl font-bold hover:text-yellow-400 cursor-pointer">
                  <Link href={`/blogs/${item.id}`} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </Link>
                </h2>
                <p className="pt-3 pl-3 text-white">
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

        <div className="w-1/2">
         <Searchbar/>
          <div className="grid place-content-center list-none mt-10 gap-4 text-xl">
           <BlogCategory/>
            <FeaturedProducts/>
            <h3 className="text-3xl font-bold p-5 mt-10">Tags</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-4">
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

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Blog;
