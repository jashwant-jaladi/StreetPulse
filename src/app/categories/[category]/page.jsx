"use client"

import { useEffect, useState } from "react"
import useShopStore from "@/zustand/shopStore"
import { StarIcon } from "@chakra-ui/icons"
import Image from "next/image"
import Shopnav from "@/app/shop/shopnav"


const CategoryPage = ({ params }) => {
    const { category } = params
    const [products, setProducts] = useState([])
    const { shops } = useShopStore()

    useEffect(() => {
        const filteredProducts = shops.filter((product) => product.category === category)
        setProducts(filteredProducts)
    }, [category, shops])

    if (products.length === 0) {
        return (
          <div>
            <Shopnav />
            <div className="text-center text-red-500 p-24 bg-black flex justify-center">No Products available for this category</div>
          </div>
        );
      }

    return(
        <div>
        <Shopnav/>
        <div className='bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center'>
        {products.map((item)=>
        (
          <div key={item._id} className='border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden'>
          <Image src={item.image} width={300} height={300} alt="cart item" className='w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105'/>
          
          <div className='flex justify-between gap-4'>
          <div className='line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer'>{item.name}</div>
          <button className='pt-2 flex items-center'><Image src= "/heart.svg" width={25} height={25} alt="heart Image"/></button>
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
        </div>
    )
}

export default CategoryPage