'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Import useParams
import HandleSearch from '../header/HandleSearch';

const Shopnav = () => {
  const params = useParams(); // Get route parameters
  const currentCategory = params?.category; // Extract 'category' param if available
  
  // State to manage modal visibility
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Function to handle opening the search modal
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  // Function to handle closing the search modal
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <div>
      <div className='bg-[url("/about-2.avif")] h-40 bg-bottom bg-cover border-b-2 border-yellow-400'></div>
      <div className='text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]'>
        {currentCategory ? currentCategory.toUpperCase() : 'Shop'}
      </div>
      <div className='flex flex-row bg-black text-yellow-400'>
        <nav className='bg-black text-yellow-400 flex flex-row gap-4 pt-8 px-16'>
          <Link href="/shop" className='hover:text-white'>All Products</Link>
          <Link href="/categories/apparel" className='hover:text-white'>Apparel</Link>
          <Link href="/categories/bags" className='hover:text-white'>Bags</Link>
          <Link href="/categories/rugs" className='hover:text-white'>Rugs</Link>
          <Link href="/categories/skateboards" className='hover:text-white'>Skateboards</Link>
          <Link href="/categories/sneakers" className='hover:text-white'>Sneakers</Link>
        </nav>
        <div className='flex flex-row gap-5 pt-8 px-16 my-auto mx-auto mr-8 bg-black text-yellow-400'>
          <button>Filter</button>
          {/* Open the search modal on click */}
          <button onClick={openSearchModal}>Search</button>
        </div>
      </div>

      {/* Conditionally render HandleSearch modal */}
      {isSearchModalOpen && <HandleSearch onClose={closeSearchModal} />}
    </div>
  );
};

export default Shopnav;
