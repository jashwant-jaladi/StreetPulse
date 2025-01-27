import React from 'react';
import prisma from '@/libs/db';
import Image from 'next/image';
import Comment from '../Comment';
import Searchbar from '../Searchbar';
import FeaturedProducts from '../FeaturedProducts';
import BlogCategory from '../BlogCategory';

const BlogDetails = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return (
      <div className="bg-black text-yellow-400 h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
      </div>
    );
  }
  const post = await prisma.blogs.findUnique({
    where: { id: parseInt(id, 10) }, // Assuming the ID is a number
  });

  // If no post is found, handle it gracefully
  if (!post) {
    return (
      <div className="bg-black text-yellow-400 h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-black text-yellow-400">
      {/* Blog Content */}
      <div className="lg:w-3/5 p-5 lg:p-10">
        <div className="pt-10">
          {/* Blog Image */}
          <div className="border-2 border-yellow-600 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-auto object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg"
            />
          </div>
        </div>

        {/* Blog Details */}
        <div className="mt-5">
          <p className="text-gray-500">
            By {post.name} on {new Date(post.date).toLocaleDateString()}
          </p>
          <h2 className="text-2xl font-bold mt-3">{post.title}</h2>
          <p className="text-white mt-3">{post.content}</p>
        </div>

        {/* Comments Section */}
        <Comment blogId={post.id} />
      </div>

      {/* Sidebar */}
      <div className="lg:w-2/5 p-5">
        <Searchbar />
        <div className="mt-10">
          <BlogCategory />
          <FeaturedProducts />
          <h3 className="text-2xl font-bold mt-10 text-yellow-600">Tags</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
            {['Men', 'Women', 'Fashion', 'LifeStyle', 'Denim', 'StreetStyle', 'Crafts'].map((tag) => (
              <button
                key={tag}
                className="border-2 border-yellow-700 rounded-3xl p-2 text-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
