"use client";  
import React, { useEffect, useState } from "react";  
import Image from "next/image";  
import Link from "next/link";  
import useShopStore from "@/zustand/shopStore";  
import { useSession } from "next-auth/react";  

const Wishlist = () => {  
  const { data: session } = useSession();  
  const userId = session?.user?.id;  
  const wishlist = useShopStore((state) => state.wishlist);  // Get wishlist from Zustand store  
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);  // Fetch wishlist from the API  
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);  // Function to remove from Zustand store  
  
  const [loading, setLoading] = useState(true);  // Loading state to handle async fetching

  // Fetch wishlist data on component mount  
  useEffect(() => {  
    if (userId && wishlist.length === 0) {  // Only fetch if the wishlist is empty and user is available
      fetchWishlist(userId);  
    } else {
      setLoading(false); // If data is already available, stop loading
    }
  }, [userId, wishlist, fetchWishlist]);  

  // Guard against empty wishlist when it's being fetched or is empty  
  if (loading) {
    return (
      <div className="bg-black">
        <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400">
          WISHLIST SECTION
        </div>
        <p className="text-yellow-400 text-2xl pb-5 bg-black text-center mt-10">Loading your wishlist...</p>
      </div>
    );
  }

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
        {wishlist.map((item) => {  
          const shop = item.shop || {};  
          const shopImage = shop.image || '/default-image.jpg';  // Fallback image
          return (  
            <div  
              key={item.shopId}  // Assuming shopId is the unique identifier for the item  
              className="border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden"  
            >  
              {/* Product Image */}  
              <Image  
                src={shopImage}  
                width={300}  
                height={300}  
                alt={shop.name || 'Product Image'}  
                className="w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105"  
              />  
              {/* Product Name and Wishlist Button */}  
              <div className="flex justify-between gap-4">  
                <div className="line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer">  
                  <Link href={`/shop/${item.shopId}`}>{shop.name}</Link>  
                </div>  
                <button  
                  className="pt-2 flex items-center"  
                  onClick={() => removeFromWishlist(userId, item.shopId)}  
                >  
                  <Image  
                    src="/heart-clicked.png"  
                    alt="Remove from Wishlist"  
                    width={25}  
                    height={25}  
                  />  
                </button>  
              </div>  
              {/* Product Price */}  
              <div className="flex gap-3 mt-1">  
                <span className="font-semibold">₹ {shop.price}</span>  
                <span className="line-through text-slate-500">  
                  ₹ {shop.preOffer}  
                </span>  
                <span className="text-green-500">{shop.discount}% off</span>  
              </div>  
            </div>  
          );  
        })}  
      </div>  
    </div>  
  );  
};  

export default Wishlist;  
