import React from 'react';
import prisma from '@/libs/db';
import Image from 'next/image';
import Comment from '../Comment';



const BlogDetails = async ({ params }) => {
  const {id} = params
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
    <div className="flex flex-row bg-black text-yellow-400">
      {/* Blog Content */}
      <div className="bg-black text-yellow-600 p-10 pb-20">
        <div className="w-[50vw] ml-20">
          {/* Blog Image */}
          <div className="pt-20">
            <div className="border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={500}
                className="w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg"
              />
            </div>
          </div>

          {/* Blog Details */}
          <div className="w-[700px]">
            <p className="pt-5 pl-3 text-gray-500">
              By {post.name} on {new Date(post.date).toLocaleDateString()}
            </p>
            <h2 className="pt-5 pl-3 text-2xl font-bold">{post.title}</h2>
            <p className="pt-5 pl-3 text-white w-[100vh]">{post.content}</p>
          </div>

          <Comment blogId={post.id}/>
      
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="p-3 m-auto mt-20 flex justify-center content-center border-2 border-yellow-400 rounded-lg bg-black text-yellow-400"
        />
        <div className="grid place-content-center list-none mt-10 gap-4 text-xl">
          <h3 className="text-3xl font-bold p-5">Categories</h3>
          <li>Fashion</li>
          <hr />
          <li>StreetStyle</li>
          <hr />
          <li>Beauty</li>
          <hr />
          <li>Life Style</li>
          <hr />
          <li>DIY & Crafts</li>
          <h3 className="text-3xl font-bold p-5 mt-10">Featured Products</h3>
          <h3 className="text-3xl font-bold p-5 mt-10">Tags</h3>
          <div className="grid grid-rows-4 grid-flow-col gap-4 text-sm">
            <button className="border-2 border-yellow-700 rounded-3xl p-2">Men</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">Women</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">Fashion</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">LifeStyle</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">Denim</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">StreetStyle</button>
            <button className="border-2 border-yellow-700 rounded-3xl p-2">Crafts</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;