"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from '@chakra-ui/icons'
import Shopnav from '../shop/shopnav'


const Shoes = () => {

const [shoe,setShoes]=useState([])


useEffect(() => {
  axios.get('http://localhost:4000/Shop').then((res) => {
    setShoes(res.data);
  }),[]
})

  return (
   
    <div>
    <Shopnav/>
    <div className='bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center'>
    {shoe.map((item)=>
    (
      item.category=="shoes"&&
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

export default Shoes