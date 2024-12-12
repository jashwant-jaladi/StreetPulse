import React from "react";
import Link from "next/link";

const CategoryGrid = () => {
  return (
    <div className="bg-black pt-20">
      <div className="grid grid-cols-6 grid-rows-2 gap-4 h-[750px] w-[85%] m-auto py-8 px-4">

        {/* Skateboards */}
        <div
          style={{ backgroundImage: "url('/home/skateboardgrid2.jpg')" }}
          className="relative bg-center bg-[length:85%] col-start-1 col-end-4 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300"
        >
          <div className="p-3 text-black">
            <h3 className="font-bold text-2xl">Skateboards</h3>
            <p className="font-bold text-md text-gray-500">New Collection</p>
          </div>
          <Link href="/categories/skateboards">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Apparels */}
        <div
          style={{ backgroundImage: "url('/home/apparelgrid.jpg')" }}
          className="relative bg-center bg-[length:85%] col-start-4 col-end-7 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300"
        >
          <div className="p-3 text-black">
            <h3 className="font-bold text-2xl">Apparels</h3>
            <p className="font-bold text-md text-gray-500">Fresh Arrivals</p>
          </div>
          <Link href="/categories/apparel">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Vanity Bags */}
        <div
          style={{ backgroundImage: "url('/home/bags.jpg')" }}
          className="relative bg-right bg-[length:90%] mb-2 col-start-1 col-end-3 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300"
        >
          <div className="p-3 text-black">
            <h3 className="font-bold text-2xl">Vanity Bags</h3>
            <p className="font-bold text-sm text-gray-500">Seasonal Showcase</p>
          </div>
          <Link href="/categories/bags">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Sneakers */}
        <div
          style={{ backgroundImage: "url('/home/sneakersgrid2.jpg')" }}
          className="relative bg-center mb-2 bg-[length:100%] col-start-3 col-end-5 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300"
        >
          <div className="p-3 text-black">
            <h3 className="font-bold text-2xl">Sneakers</h3>
            <p className="font-bold text-md text-gray-500">Next-gen collection</p>
          </div>
          <Link href="/categories/sneakers">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Rugs */}
        <div
          style={{ backgroundImage: "url('/home/rugs.webp')" }}
          className="relative bg-top bg-[length:100%] mb-2 bg-no-repeat col-start-5 col-end-7 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300"
        >
          <div className="p-3 text-black">
            <h3 className="font-bold text-2xl">Rugs</h3>
            <p className="font-bold text-sm text-gray-500">Revamped Assortment</p>
          </div>
          <Link href="/categories/rugs">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CategoryGrid;
