import React from 'react'
import Link from 'next/link'


const Shopnav = () => {
  return (
    <div>
    <div className='bg-[url("/about-2.avif")] h-40 bg-bottom  bg-cover border-b-2 border-yellow-400'></div>
    <div className=' text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]'>Shop</div>
    <div className='flex flex-row bg-black text-yellow-400'>
    <nav className='bg-black text-yellow-400 flex flex-row gap-4 pt-8 px-16'>
      <Link href={"/shop"} className='hover:text-white'>All Products</Link>
      <Link href={"/apparel"} className='hover:text-white'>Apparel</Link>
      <Link href={"/bags"} className='hover:text-white'>Bags</Link>
      <Link href={"/rugs"} className='hover:text-white'>Rugs</Link>
      <Link href={"/skateboards"} className='hover:text-white'>Skateboards</Link>
      <Link href={"/sneakers"} className='hover:text-white'>Sneakers</Link>
    </nav>
    <div className='flex flex-row gap-5 pt-8 px-16 my-auto mx-auto mr-8 bg-black text-yellow-400'>
      <button> Filter</button>
      <button>Search</button>
    </div>
    </div>
    </div>
  )
}

export default Shopnav