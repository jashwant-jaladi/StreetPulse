"use client";
import { useEffect } from "react";
import useShopStore from "@/zustand/shopStore";
import Shopnav from "@/app/shop/shopnav";
import Item from "@/app/components/Item";
import { useSession } from "next-auth/react";

const CategoryPage = ({ params }) => {
  const { category } = params;

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const products = useShopStore((state) => state.shops);
  const fetchShops = useShopStore((state) => state.fetchShops);
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  // Fetch data when the component mounts
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
  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  // Handle empty category case
  if (filteredProducts.length === 0) {
    return (
      <div>
        <Shopnav />
        <div className="text-center text-red-500 p-24 bg-black flex justify-center">
          No Products available for this category
        </div>
      </div>
    );
  }

  // Utility: Get rating class
  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };

  // Check if the product is in the wishlist
  const isInWishlist = (shopId) => wishlist.some((item) => item.shopId === shopId);

  // Handle wishlist button click
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
      <Shopnav />
      <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center">
        {filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.prices}
            image={item.image}
            category={item.category}
            noOfRatings={item.noOfRatings}
            preOffer={item.preOffer}
            discount={item.discount}
            rating={item.rating}
            ratingClass={getRatingClass(item.rating)}
            handleWishlistClick={handleWishlistClick}
            isInWishlist={isInWishlist(item.id)} // Reactively checks wishlist status
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
