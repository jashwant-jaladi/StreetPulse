"use client";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import useShopStore from "@/zustand/shopStore";
import Shopnav from "@/app/shop/shopnav";
import Item from "@/app/components/Item";
import { useSession } from "next-auth/react";

const CategoryPage = ({ params }) => {
  const { category } = params;
  const [selectedFilter, setSelectedFilter] = useState("");

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const products = useShopStore((state) => state.shops);
  const fetchShops = useShopStore((state) => state.fetchShops);
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  useEffect(() => {
    const initializeData = async () => {
      if (userId) {
        try {
          await fetchShops();
          await fetchWishlist(userId);
        } catch (error) {
          console.error("Error initializing data:", error);
        }
      }
    };

    initializeData();
  }, [userId, fetchShops, fetchWishlist]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // First filter by category
    let filtered = products.filter((product) => product.category === category);
    
    // Then apply sorting if a filter is selected
    if (selectedFilter) {
      // Create a new array to avoid mutating the original
      filtered = [...filtered];
      
      switch (selectedFilter) {
        case "priceLowToHigh":
          filtered.sort((a, b) => a.prices - b.prices);
          break;
        case "priceHighToLow":
          filtered.sort((a, b) => b.prices - a.prices);
          break;
        case "discountHighToLow":
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        case "ratingHighToLow":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  }, [products, category, selectedFilter]);

  if (filteredProducts.length === 0) {
    return (
      <div>
        <Shopnav onFilterChange={setSelectedFilter} />
        <div className="text-center text-red-500 p-24 bg-black flex justify-center">
          No Products available for this category
        </div>
      </div>
    );
  }

  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };

  const isInWishlist = (shopId) => wishlist.some((item) => item.shopId === shopId);

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
      <Shopnav onFilterChange={setSelectedFilter} />
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
            isInWishlist={isInWishlist(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;