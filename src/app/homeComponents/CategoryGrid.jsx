import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryGrid = () => {
  return (
    <div className="bg-black pt-10 sm:pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-auto sm:h-[750px] w-[90%] sm:w-[85%] m-auto py-8 px-4">

        {/* Skateboards */}
        <div className="relative col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-2 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300 h-[300px] sm:h-auto">
          <Image
            src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646760/StreetPulse/HomepageImages%20and%20headers/skateboardgrid2_teakbo.jpg"
            alt="Skateboards"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="p-3 text-black relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl">Skateboards</h3>
            <p className="font-bold text-sm sm:text-md text-gray-500">New Collection</p>
          </div>
          <Link href="/categories/skateboards">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Apparels */}
        <div className="relative col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-2 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300 h-[300px] sm:h-auto">
          <Image
            src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737647300/StreetPulse/HomepageImages%20and%20headers/apparelgrid_tt8rpr.jpg"
            alt="Apparels"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="p-3 text-black relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl">Apparels</h3>
            <p className="font-bold text-sm sm:text-md text-gray-500">Fresh Arrivals</p>
          </div>
          <Link href="/categories/apparel">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Vanity Bags */}
        <div className="relative col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-2 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300 h-[300px] sm:h-auto">
          <Image
            src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646755/StreetPulse/HomepageImages%20and%20headers/bags_xlxk91.jpg"
            alt="Vanity Bags"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="p-3 text-black relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl">Vanity Bags</h3>
            <p className="font-bold text-sm text-gray-500">Seasonal Showcase</p>
          </div>
          <Link href="/categories/bags">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Sneakers */}
        <div className="relative col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-2 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300 h-[300px] sm:h-auto">
          <Image
            src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646760/StreetPulse/HomepageImages%20and%20headers/sneakersgrid2_ljnpsb.jpg"
            alt="Sneakers"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="p-3 text-black relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl">Sneakers</h3>
            <p className="font-bold text-sm sm:text-md text-gray-500">Next-gen collection</p>
          </div>
          <Link href="/categories/sneakers">
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700 hover:text-black">
              Click me!
            </button>
          </Link>
        </div>

        {/* Rugs */}
        <div className="relative col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 border-4 border-yellow-700 rounded-xl overflow-hidden group hover:backdrop-blur-md transition duration-300 h-[300px] sm:h-auto">
          <Image
            src="https://res.cloudinary.com/dm7ntehzl/image/upload/v1737646762/StreetPulse/HomepageImages%20and%20headers/rugs_ls9hnn.webp"
            alt="Rugs"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="p-3 text-black relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl">Rugs</h3>
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