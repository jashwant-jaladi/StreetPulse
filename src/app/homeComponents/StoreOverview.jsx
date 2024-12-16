"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@chakra-ui/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useShopStore from "@/zustand/shopStore"; // Import Zustand store

const StoreOverview = () => {
  const { shops, addToWishlist, removeFromWishlist, wishlist } = useShopStore(); // Access data from Zustand store
  const [display, setDisplay] = useState([]); // Data to display
  const [activeSort, setActiveSort] = useState(""); // Track active sorting option

  useEffect(() => {
    // Group products by category and fetch the first 5 items from each category
    const groupedByCategory = shops.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    // For each category, slice the first 5 items and update the display state
    const limitedDisplay = Object.values(groupedByCategory).map((categoryItems) => {
      return categoryItems.slice(0, 5); // Get only the first 5 items from each category
    });

    setDisplay(limitedDisplay.flat()); // Flatten the array to display all items from all categories
  }, [shops]);

  const handleSort = (sortingOption) => {
    let sortedData;

    switch (sortingOption) {
      case "Best Seller":
        sortedData = shops.filter((item) => item.bestSeller === true);
        break;
      case "Newest":
        sortedData = shops.filter((item) => item.newest === true);
        break;
      case "Discount":
        sortedData = [...shops].sort((a, b) => b.discount - a.discount);
        break;
      case "Top Rated":
        sortedData = [...shops].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData = [...shops];
        break;
    }

    setDisplay(sortedData.slice(0, 8)); // Limit display to 8 items
    setActiveSort(sortingOption);
  };

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  const handleWishlistClick = (product) => {
    // Check if product is already in wishlist
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id); // Remove from wishlist
    } else {
      addToWishlist(product); // Add to wishlist
    }
  };

  return (
    <div className="bg-black">
      <h3 className="text-5xl font-bold text-yellow-500 pt-28 flex justify-center">
        Store Overview
      </h3>

      <div className="flex flex-row justify-center gap-10 pt-10 bg-black text-yellow-500 font-semibold">
        <button
          className={`hover:underline ${activeSort === "Best Seller" ? "underline" : ""}`}
          onClick={() => handleSort("Best Seller")}
        >
          Best Seller
        </button>
        <button
          className={`hover:underline ${activeSort === "Newest" ? "underline" : ""}`}
          onClick={() => handleSort("Newest")}
        >
          Newest
        </button>
        <button
          className={`hover:underline ${activeSort === "Discount" ? "underline" : ""}`}
          onClick={() => handleSort("Discount")}
        >
          Discount
        </button>
        <button
          className={`hover:underline ${activeSort === "Top Rated" ? "underline" : ""}`}
          onClick={() => handleSort("Top Rated")}
        >
          Top Rated
        </button>
      </div>

      <div className="bg-black text-slate-300 pb-10">
        <Slider {...settings} className="w-[1200px] mx-auto mt-10">
          {display.map((item) => (
            <div
              key={item.id}
              className="border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image}
                width={300}
                height={300}
                alt={item.name}
                className="w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105"
              />

              <div className="flex justify-between gap-4">
                <div className="line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer">
                  {item.name}
                </div>
                <button
                  className="pt-2 flex items-center"
                  onClick={() => handleWishlistClick(item)}
                >
                  <Image
                    src={wishlist.some((product) => product.id === item.id) ? "/heart-clicked.png" : "/heart.svg"}
                    width={25}
                    height={25}
                    alt="Heart Icon"
                  />
                </button>
              </div>

              {item.rating <= 3 ? (
                <span className="inline bg-red-600 p-1 font-semibold">
                  <span>{item.rating}</span>
                  <StarIcon className="fill-white inline pl-1 pb-1" />
                </span>
              ) : item.rating <= 4 ? (
                <span className="inline bg-yellow-600 p-1 font-semibold">
                  <span>{item.rating}</span>
                  <StarIcon className="fill-white inline pl-1 pb-1" />
                </span>
              ) : (
                <span className="inline bg-green-700 p-1 font-semibold">
                  <span>{item.rating}</span>
                  <StarIcon className="fill-white inline pl-1 pb-1" />
                </span>
              )}

              <span className="pl-2">({item.noOfRatings})</span>
              <div className="flex gap-3 mt-1">
                <span className="font-semibold">{item.prices}</span>
                <span className="line-through text-slate-500">{item.preOffer}</span>
                <span className="text-green-500">{item.discount}% off</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default StoreOverview;
