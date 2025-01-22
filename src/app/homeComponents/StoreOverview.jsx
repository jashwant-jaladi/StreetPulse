"use client";

import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";

const StoreOverview = () => {
  const products = useShopStore((state) => state.shops);
  const fetchShops = useShopStore((state) => state.fetchShops);
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [display, setDisplay] = useState([]);
  const [activeSort, setActiveSort] = useState("");

  // Fetch shops data on mount
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

  // Check if product is in the wishlist
  const isInWishlist = (shopId) =>
    wishlist?.some((item) => item.shopId === shopId);

  // Process shops data and group by category
  useEffect(() => {
    if (!products || products.length === 0) return;

    const groupedByCategory = products.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const limitedDisplay = Object.values(groupedByCategory).flatMap(
      (categoryItems) => categoryItems.slice(0, 5)
    );

    setDisplay(limitedDisplay);
  }, [products]);

  // Handle sorting based on different criteria
  const handleSort = (sortingOption) => {
    if (!products) return;

    let sortedData = [];

    switch (sortingOption) {
      case "Best Seller":
        sortedData = products.filter((item) => item.bestSeller === true);
        break;
      case "Newest":
        sortedData = products.filter((item) => item.newest === true);
        break;
      case "Discount":
        sortedData = [...products].sort((a, b) => b.discount - a.discount);
        break;
      case "Top Rated":
        sortedData = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData = products;
        break;
    }

    setDisplay(sortedData.slice(0, 8));
    setActiveSort(sortingOption);
  };

  // Slick carousel settings with responsive breakpoints
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handle adding/removing items to wishlist
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
      <div className="bg-black text-slate-300 pb-10">
        <Slider {...settings} className="w-[90vw] sm:w-[80vw] mx-auto mt-10 px-4">
          {display.map((item) => (
            <div key={item.id} className="px-2"> {/* Add padding between items */}
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
                ratingClass={getRatingClass(item.rating)}
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