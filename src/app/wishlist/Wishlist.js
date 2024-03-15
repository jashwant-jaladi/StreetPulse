"use client"
import React, { useState } from 'react';
import { useWishlist } from '../context/wishlistContext';
import { useProductContext } from '../context/productContext';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@chakra-ui/icons';


const Wishlist = () => {
  const products = useProductContext();
  const { wishlist } = useWishlist();


  const wishlistProducts = products.filter((product) => wishlist.includes(product._id));

  return (
    <>
    <h2 className='bg-black text-slate-300 font-bold p-5 pt-12 text-6xl text-center'>Your Wishlist</h2>
    <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center">
      
      {wishlistProducts.map((item) => (
      <div key={item._id} className='border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden'>
      <Image src={item.image} width={300} height={300} className='w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105'/>
      
      <div className='flex justify-between gap-4'>
      <div className='line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer'><Link href={'/shop/'+item._id}>{item.name}</Link></div>
      <button className='pt-2 flex items-center'><Image src={ "/heart-clicked.png"} width={25} height={25}/></button>
      </div>
     
     {item.rating<=3? <span className='inline bg-red-600 p-1 font-semibold'>
      <span>{item.rating}</span>
      <StarIcon className='fill-white inline pl-1 pb-1'/>
      </span>:item.rating<=4
      ?<span className='inline bg-yellow-600 p-1 font-semibold'>
      <span>{item.rating}</span>
      <StarIcon className='fill-white inline pl-1 pb-1'/>
      </span>
      :<span className='inline bg-green-700 p-1 font-semibold'>
      <span>{item.rating}</span>
      <StarIcon className='fill-white inline pl-1 pb-1'/>
      </span>}

      <span className='pl-2'>({item.noOfRatings})</span>
      <div className='flex gap-3 mt-1'>
      <span className='font-semibold'>{item.prices}</span>
      <span className='line-through text-slate-500'>{item.preOffer}</span>
      <span className='text-green-500'>{item.discount}% off</span>
      </div>
      </div>
    ))} 
 
    </div>
    </>
  );
};

export default Wishlist;
