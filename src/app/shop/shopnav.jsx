"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import HandleSearch from "../header/HandleSearch";
import Filters from "./Filters";

const Shopnav = ({ onFilterChange }) => {
  const params = useParams();
  const currentCategory = params?.category;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <div className="relative h-32 sm:h-40 text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
      <Image
        src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737648404/StreetPulse/HomepageImages%20and%20headers/contact_t6xcug.jpg"
        alt={`${currentCategory || 'Shop'} Category Background`}
        fill
        className="object-cover border-b-2 border-yellow-400"
        style={{ filter: 'brightness(50%)' }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl sm:text-4xl md:text-5xl text-center">
        {currentCategory ? currentCategory.toUpperCase() : "SHOP"}
      </div>
    </div>

      {/* Navigation and Buttons */}
      <div className="flex flex-col sm:flex-row justify-between bg-black text-yellow-400 p-4 sm:p-8">
        {/* Navigation Links */}
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base">
          <Link href="/shop" className="hover:text-white">
            All Products
          </Link>
          <Link href="/categories/apparel" className="hover:text-white">
            Apparel
          </Link>
          <Link href="/categories/bags" className="hover:text-white">
            Bags
          </Link>
          <Link href="/categories/rugs" className="hover:text-white">
            Rugs
          </Link>
          <Link href="/categories/skateboards" className="hover:text-white">
            Skateboards
          </Link>
          <Link href="/categories/sneakers" className="hover:text-white">
            Sneakers
          </Link>
        </nav>

        {/* Filter and Search Buttons */}
        <div className="flex flex-row gap-4 mt-4 sm:mt-0">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="hover:text-white text-sm sm:text-base"
          >
            Filter
          </button>
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="hover:text-white text-sm sm:text-base"
          >
            Search
          </button>
        </div>
      </div>

      {/* Modals */}
      {isSearchModalOpen && (
        <HandleSearch onClose={() => setIsSearchModalOpen(false)} />
      )}
      <Filters
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        setSelectedFilter={onFilterChange}
      />
    </div>
  );
};

export default Shopnav;