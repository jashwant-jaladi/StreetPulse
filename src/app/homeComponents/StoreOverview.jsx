"use client";

import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";

// Custom hook to handle fetching and state initialization
const useStoreData = (userId) => {
  const fetchShops = useShopStore((state) => state.fetchShops);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const wishlist = useShopStore((state) => state.wishlist);
  const products = useShopStore((state) => state.shops);

  useEffect(() => {
    const initializeData = async () => {
      if (userId) {
        try {
          await fetchShops();
          await fetchWishlist(userId);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    initializeData();
  }, [userId, fetchShops, fetchWishlist]);

  return { products, wishlist };
};

const StoreOverview = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { products, wishlist } = useStoreData(userId);

  const [display, setDisplay] = useState([]);
  const [activeSort, setActiveSort] = useState("");

  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  // Group products by category
  const groupedProducts = useMemo(() => {
    if (!products) return {};
    return products.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [products]);

  // Initial display setup (limited by categories)
  useEffect(() => {
    if (!groupedProducts) return;
    const limitedDisplay = Object.values(groupedProducts).flatMap((categoryItems) =>
      categoryItems.slice(0, 5)
    );
    setDisplay(limitedDisplay);
  }, [groupedProducts]);

  // Sorting logic
  const handleSort = (sortingOption) => {
    if (!products) return;

    let sortedData = [];
    switch (sortingOption) {
      case "Best Seller":
        sortedData = products.filter((item) => item.bestSeller);
        break;
      case "Newest":
        sortedData = products.filter((item) => item.newest);
        break;
      case "Discount":
        sortedData = [...products].sort((a, b) => b.discount - a.discount);
        break;
      case "Top Rated":
        sortedData = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData = products;
    }

    setDisplay(sortedData.slice(0, 8));
    setActiveSort(sortingOption);
  };

  // Carousel settings as a reusable utility
  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }), []);

  // Wishlist handling
  const isInWishlist = (shopId) => wishlist?.some((item) => item.shopId === shopId);

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

  // Guard against empty products
  if (!products || products.length === 0) {
    return <p className="text-white text-center mt-10">No products available.</p>;
  }

  return (
    <div className="bg-black">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 pt-20 sm:pt-28 text-center">
        Store Overview
      </h3>

      {/* Sorting Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 pt-10 bg-black text-yellow-500 font-semibold px-4">
        {["Best Seller", "Newest", "Discount", "Top Rated"].map((option) => (
          <button
            key={option}
            className={`hover:underline ${
              activeSort === option ? "underline" : ""
            } text-sm sm:text-base`}
            onClick={() => handleSort(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="slider-container w-[90vw] sm:w-[80vw] mx-auto mt-10">
  <Slider {...sliderSettings}>
    {display.map((item) => (
      <div key={item.id} className="px-2">
        <Item
          id={item.id}
          name={item.name}
          price={item.prices}
          image={item.image}
          category={item.category}
          noOfRatings={item.noOfRatings}
          preOffer={item.preOffer}
          discount={item.discount}
          rating={item.rating}
          ratingClass={
            item.rating <= 3
              ? "bg-red-600"
              : item.rating <= 4
              ? "bg-yellow-600"
              : "bg-green-700"
          }
          handleWishlistClick={handleWishlistClick}
          isInWishlist={isInWishlist(item.id)}
          description={item.description}
        />
      </div>
    ))}
  </Slider>
</div>

    </div>
  );
};

export default StoreOverview;
