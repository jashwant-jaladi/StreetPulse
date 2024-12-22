import React, { useEffect, useCallback } from "react";
import Item from "../components/Item";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";

const ShopComponent = () => {
  const products = useShopStore((state) => state.shops);
  const fetchShops = useShopStore((state) => state.fetchShops);
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const initializeData = async () => {
      if (userId) {
        try {
          await fetchShops();
          await fetchWishlist(userId); // Fetch wishlist on component load
        } catch (error) {
          console.error("Error initializing data:", error);
        }
      }
    };

    initializeData();
  }, [userId, fetchShops, fetchWishlist]);

  // Guard against empty data
  if (!products || products.length === 0) {
    return <p className="text-white text-center mt-10">No products available.</p>;
  }

  // Check if product is in the wishlist
  const isInWishlist = (shopId) => 
    wishlist?.some((item) => item.shopId === shopId);

  // Utility function for rating classes
  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };
  const handleWishlistClick = (shopId) => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (isInWishlist(shopId)) {
      removeFromWishlist(userId, shopId);
    } else {
      addToWishlist(userId, shopId);
    }
  };

  return (
    <div>
      <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 place-items-center">
        {products.map((item) => (
          
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.prices}
            image={item.image}
            category={item.category}
            noOfRatings={item.noOfRatings}
            description={item.description}
            preOffer={item.preOffer}
            discount={item.discount}
            rating={item.rating}
            ratingClass={getRatingClass(item.rating)}
            handleWishlistClick={handleWishlistClick}
            isInWishlist={isInWishlist(item.id)}
          />
        
        ))}
      </div>
    </div>
  );
};

export default ShopComponent;
