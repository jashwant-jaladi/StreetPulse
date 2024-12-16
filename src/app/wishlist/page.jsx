"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useShopStore from "@/zustand/shopStore";

const Wishlist = () => {
  const wishlist = useShopStore((state) => state.wishlist); // Access wishlist from Zustand
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist); // Remove from wishlist

  // Guard against empty wishlist
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="bg-black">
        <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400">
          WISHLIST SECTION
        </div>
        <p className="text-yellow-400 text-2xl pb-5 bg-black text-center mt-10">Your wishlist is empty 😭</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400">
        WISHLIST SECTION
      </div>
      <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden"
          >
            {/* Product Image */}
            <Image
              src={item.image}
              width={300}
              height={300}
              alt={item.name}
              className="w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105"
            />

            {/* Product Name and Wishlist Button */}
            <div className="flex justify-between gap-4">
              <div className="line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer">
                <Link href={`/shop/${item.id}`}>{item.name}</Link>
              </div>
              <button
                className="pt-2 flex items-center"
                onClick={() => removeFromWishlist(item.id)} // Toggle Wishlist
              >
                <Image
                  src="/heart-clicked.png" // Filled heart for items in wishlist
                  alt="Remove from Wishlist"
                  width={25}
                  height={25}
                />
              </button>
            </div>

            {/* Product Price */}
            <div className="flex gap-3 mt-1">
              <span className="font-semibold">₹ {item.prices}</span>
              <span className="line-through text-slate-500">
                ₹ {item.preOffer}
              </span>
              <span className="text-green-500">{item.discount}% off</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
