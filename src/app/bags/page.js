"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@chakra-ui/icons'


const Bags = () => {

const [bags,setBags]=useState([])


useEffect(() => {
  axios.get('http://localhost:4000/Shop').then((res) => {
    setBags(res.data);
  }),[]
})



  return (
   
    <div>
    <div className='bg-[url("/about-2.avif")] h-40 bg-bottom  bg-cover border-b-2 border-yellow-400'></div>
    <div className=' text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]'>Shop</div>
    <div className='flex flex-row bg-black text-yellow-400'>
    <nav className='bg-black text-yellow-400 flex flex-row gap-4 pt-8 px-16'>
      <Link href={"/shop"} className='hover:text-white'>All Products</Link>
      <Link href={"/shop"} className='hover:text-white'>Apparel</Link>
      <Link href={"/bags"} className='hover:text-white'>Bags</Link>
      <Link href={"/shop"} className='hover:text-white'>Rugs</Link>
      <Link href={"/shop"} className='hover:text-white'>Skateboards</Link>
      <Link href={"/shop"} className='hover:text-white'>Sneakers</Link>
    </nav>
    <div className='flex flex-row gap-5 pt-8 px-16 my-auto mx-auto mr-8 bg-black text-yellow-400'>
      <button> Filter</button>
      <button>Search</button>
    </div>
    </div>
    <div className='bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center'>
    {bags.map((item)=>
    (
      item.category=="bags"&&
      <div key={item.id} className='border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden'>
      <Image src={item.image} width={300} height={300} className='w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105'/>
      
      <div className='flex justify-between gap-4'>
      <div className='line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer'>{item.name}</div>
      <button className='pt-2 flex items-center'><Image src= "/heart.svg" width={25} height={25}/></button>
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
      <span className='text-green-500'>{item.discount}</span>
      </div>
      </div>
    ))} 
    </div>
    </div>
  )
}

export default Bags