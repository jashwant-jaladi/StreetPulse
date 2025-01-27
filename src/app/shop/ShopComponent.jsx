import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";

import Loading from "../components/Loading";

const ShopComponent = ({ selectedFilter }) => {
  
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const products = useShopStore((state) => state.shops);
  const wishlist = useShopStore((state) => state.wishlist);

  const fetchShops = useShopStore((state) => state.fetchShops);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  // Add loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true); // Start loading
      try {
        await fetchShops();
        if (userId) {
          await fetchWishlist(userId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    initializeData();
  }, [fetchShops, fetchWishlist, userId]);

  // Filter products based on selected filter and category
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (selectedFilter) {
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
  }, [products, selectedFilter]);

  // Check if a product is in the wishlist
  const isInWishlist = useMemo(
    () => new Set(wishlist.map((item) => item.shopId)),
    [wishlist]
  );

  const handleWishlistClick = (shopId) => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (isInWishlist.has(shopId)) {
      removeFromWishlist(userId, shopId);
    } else {
      addToWishlist(userId, shopId);
    }
  };

  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
    <Loading />
    );
  }

  // Guard against empty data
  if (!filteredProducts.length) {
    return <p className="text-white text-center mt-10">No products available.</p>;
  }

  return (
    <div>
      <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 place-items-center">
        {filteredProducts.map((item) => (
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
            isInWishlist={isInWishlist.has(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopComponent;
