"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Image from 'next/image'


const Shop = () => {

const [products,setProducts]=useState([])


useEffect(() => {
  axios.get('http://localhost:4000/Shop').then((res) => {
    setProducts(res.data);
  }),[]
})

if(!products) return <div>loading...</div>

  return (
   
    <div>
    <div className='bg-[url("/about-2.avif")] h-40 bg-bottom  bg-cover border-b-2 border-yellow-400'></div>
    <div className=' text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]'>Shop</div>
    <div className='bg-black text-yellow-400 p-14 grid grid-cols-4 gap-14 place-items-center'>
    {products.map((item)=>
    (
      <div key={item.id} className='border-2 border-yellow-700 w-[300px] p-3 rounded-xl overflow-hidden'>
      <Image src={item.image} width={300} height={300} className='w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105'/>
      <div className='text-ellipsis overflow-hidden whitespace-nowrap pt-3'>{item.name}</div>
      <span>{item.rating}</span>
      <span className='pl-1'>({item.noOfRatings})</span>
      <div className='flex gap-3'>
      <span>{item.prices}</span>
      <span className='line-through'>{item.preOffer}</span>
      <span>{item.discount}</span>
      </div>
      </div>
    ))} 
    </div>
    </div>
  )
}

export default Shop