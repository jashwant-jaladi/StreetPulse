"use client";
import React, { useEffect } from 'react'
import { StarIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import Image from 'next/image'
import useShopStore from '@/zustand/shopStore';

const ShopComponent = ({products}) => {
    const setShops = useShopStore((state) => state.setShops);
    useEffect(() => {
        setShops(products);
    }, [products, setShops]);
    return (
        <div>    
            <div className='bg-black text-slate-300 p-14 pt-10 grid grid-cols-4 gap-14 place-items-center'>
            {products.map((item) =>
            (
                <div key={item._id} className='border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden'>
                    <Image src={item.image} width={300} height={300} alt={item.name} className='w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105' />

                    <div className='flex justify-between gap-4'>
                        <div className='line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer'><Link href={'/shop/' + item._id}>{item.name}</Link></div>
                        <button className='pt-2 flex items-center' ><Image src="/heart.svg" alt={item.name} width={25} height={25} /></button>
                    </div>

                    {item.rating <= 3 ? <span className='inline bg-red-600 p-1 font-semibold'>
                        <span>{item.rating}</span>
                        <StarIcon className='fill-white inline pl-1 pb-1' />
                    </span> : item.rating <= 4
                        ? <span className='inline bg-yellow-600 p-1 font-semibold'>
                            <span>{item.rating}</span>
                            <StarIcon className='fill-white inline pl-1 pb-1' />
                        </span>
                        : <span className='inline bg-green-700 p-1 font-semibold'>
                            <span>{item.rating}</span>
                            <StarIcon className='fill-white inline pl-1 pb-1' />
                        </span>}

                    <span className='pl-2'>({item.noOfRatings})</span>
                    <div className='flex gap-3 mt-1'>
                        <span className='font-semibold'>₹ {item.prices}</span>
                        <span className='line-through text-slate-500'>₹ {item.preOffer}</span>
                        <span className='text-green-500'>{item.discount}% off</span>
                    </div>
                </div>
            ))}
        </div></div>
    )
}

export default ShopComponent